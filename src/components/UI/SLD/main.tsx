"use client";
import React, { useEffect, useState } from "react";
import ReactFlow, { Handle, Position, Node } from "reactflow";
import "reactflow/dist/style.css";
import Image from "next/image";

// Define TypeScript types for node data
interface NodeData {
  label: string;
  activePower: number;
  reactivePower: number;
  performanceRatio: number;
  imageSrc: string;
}

// Define TypeScript type for React Flow Nodes
type CustomNodeType = Node<NodeData>;

const CustomNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="custom-node">
      <Image src={data.imageSrc} alt={data.label} width={50} height={50} />
      <div className="node-label">{data.label}</div>
      <div className="node-info">
        <p><strong>Active Power:</strong> {data.activePower?.toFixed(2)} kW</p>
        <p><strong>Reactive Power:</strong> {data.reactivePower?.toFixed(2)} kVAR</p>
        <p><strong>Performance:</strong> {data.performanceRatio?.toFixed(2)} %</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

const EnergyFlowChart = () => {
    const [nodes, setNodes] = useState<CustomNodeType[]>([]);
  
    useEffect(() => {
      const fetchSLDData = async () => {
        try {
          const response = await fetch("/api/data/SLD");
          if (!response.ok) throw new Error("API request failed");
          
          const latestData = await response.json();
    
          if (!latestData) return;
    
          const newNodes = [
            {
              id: "generator1",
              type: "customNode",
              position: { x: 50, y: 200 },
              data: {
                label: "Generator 1",
                activePower: latestData[0].TotalActivePower_G1,
                reactivePower: latestData[0].TotalReactivePower_G1,
                performanceRatio: latestData[0].GeneratorOutput_G1,
                imageSrc: "/images/gen.png",
              },
            },
            {
              id: "generator2",
              type: "customNode",
              position: { x: 400, y: 200 },
              data: {
                label: "Generator 2",
                activePower: latestData[0].ActivePower_G2,
                reactivePower: latestData[0].TotalReactivePower_G2,
                performanceRatio: latestData[0].GeneratorOutput_G2,
                imageSrc: "/images/gen.png",
              },
            },
            {
              id: "generator3",
              type: "customNode",
              position: { x: 750, y: 200 },
              data: {
                label: "Generator 3",
                activePower: latestData[0].TotalActivePower_G3,
                reactivePower: latestData[0].TotalReactivePower_G3,
                performanceRatio: latestData[0].GeneratorOutput_G3,
                imageSrc: "/images/gen.png",
              },
            },
            {
              id: "pv",
              type: "customNode",
              position: { x: 850, y: 500 },
              data: {
                label: "PV Generator",
                activePower: latestData[0].TotalActivePower_PV,
                reactivePower: latestData[0].TotalReactivePower_PV,
                performanceRatio: latestData[0].GeneratorOutput_PV,
                imageSrc: "/images/pv.png",
              },
            },
            {
              id: "load",
              type: "customNode",
              position: { x: 400, y: 800 },
              data: {
                label: "Load",
                activePower: latestData[0].TotalLoad,
                reactivePower: latestData[0].TotalKVAR,
                performanceRatio: ((latestData[0].TotalLoad / 3000) * 100),
                imageSrc: "/images/load.png",
              },
            },
          ];
          setNodes(newNodes);
        } catch (error) {
          console.error("Error fetching SLD data:", error);
        }
      };  
      fetchSLDData();
    }, []);

    if (nodes.length === 0) {
      return (
        <div className="flex h-full justify-center w-full items-center min-h-72">
          <div className="border-b-2 border-gray-900 border-t-2 h-10 rounded-full w-10 animate-spin dark:border-gray-200"></div>
        </div>
      );
    }
    
    return (
      <div className="overflow-hidden w-full h-full">
       <ReactFlow
  nodes={nodes}
  edges={[
    { id: "e1", source: "generator1", target: "load", animated: true },
    { id: "e2", source: "generator2", target: "load", animated: true },
    { id: "e3", source: "generator3", target: "load", animated: true },
    { id: "e4", source: "pv", target: "load", animated: true }, // PV connection
  ]}
  nodeTypes={{ customNode: CustomNode }}
  proOptions={{ hideAttribution: true }}
  zoomOnScroll={false} 
  zoomOnPinch={false} 
  zoomOnDoubleClick={false} 
/>

      </div>
    );
  };
  
  export default EnergyFlowChart;
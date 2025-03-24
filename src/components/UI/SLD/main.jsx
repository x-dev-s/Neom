"use client";
import React, { useEffect, useState } from "react";
import ReactFlow, { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import Image from "next/image";
import { TfiReload } from "react-icons/tfi";

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node border border-gray-300 dark:border-gray-600 rounded-lg p-3 flex flex-col items-center">
      <Image src={data.imageSrc} alt={data.label} width={50} height={50} />
      <div className="node-label text-md py-3 font-semibold">{data.label}</div>
      <div className="node-info">
        <div className="flex gap-2 justify-between items-baseline">
          <span className="w-32">Active Power:</span>
          <span className="font-semibold text-lg ml-1">
            {data.activePower?.toFixed(2)}
          </span>
          <span className="text-xs"> kW</span>
        </div>
        <div className="flex gap-2 justify-between items-baseline">
          <span className="w-32">Reactive Power:</span>
          <span className="font-semibold text-lg ml-1">
            {data.reactivePower?.toFixed(2)}
          </span>
          <span className="text-xs"> kVAR</span>
        </div>
        <div className="flex gap-2 justify-between items-baseline">
          <span className="w-32">
            {data.label === "PV" ? "Performance" : "Output"}:
          </span>
          <span className="font-semibold text-lg ml-1">
            {data.performanceRatio?.toFixed(2)}
          </span>
          <span className="text-xs"> %</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default function SLD() {
  const [nodes, setNodes] = useState([]);

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
            activePower: latestData[0].TotalActivePower_G2,
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
            label: "PV",
            activePower: latestData[0].TotalActivePower_I,
            reactivePower: latestData[0].TotalReactivePower_I,
            performanceRatio: latestData[0].PVOutput,
            imageSrc: "/images/PV.png",
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
            performanceRatio: (latestData[0].TotalLoad / 3000) * 100,
            imageSrc: "/images/load.png",
          },
        },
      ];
      setNodes(newNodes);
    } catch (error) {
      console.error("Error fetching SLD data:", error);
    }
  };

  useEffect(() => {
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
    <div className="overflow-hidden relative w-full h-full">
      <span
        className="flex flex-1 absolute z-10 top-0 right-0 justify-center cursor-pointer items-center sm:flex-none"
        onClick={fetchSLDData}
      >
        <TfiReload className="h-[18px] w-[18px]" />
      </span>
      <ReactFlow
        nodes={nodes}
        edges={[
          { id: "e1", source: "generator1", target: "load" },
          { id: "e2", source: "generator2", target: "load" },
          { id: "e3", source: "generator3", target: "load" },
          { id: "e4", source: "pv", target: "load" },
        ].map((edge) => ({
          ...edge,
          animated: nodes.find((n) => n.id === edge.source)?.data.activePower > 0,
        }))}
        nodeTypes={{ customNode: CustomNode }}
        proOptions={{ hideAttribution: true }}
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
      />
    </div>
  );
};
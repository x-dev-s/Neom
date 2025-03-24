"use client"; // Ensure this is at the top

import { BarChart } from "@/components/Barchart";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
} from "@tremor/react";
import { TbSettings2 } from "react-icons/tb";
import { FiDownload } from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";
import exportFromJSON from 'export-from-json';

export default function CurtailmentBar_SingleInverter({id}) {
  const [data, setData] = useState(null);
  const [showSpanSelector, setShowSpanSelector] = useState(false);
  const [span, setSpan] = useState("Last 7 days");

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const statusColor = {
    "Max. Power Yield": 'bg-blue-500',
    "Curtailed Power Yield": 'bg-violet-500',
    "Actual Power Yield": 'bg-cyan-500',
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/data/CurtailmentBar_SingleInverter?id=${id}&span=${span.split(" ")[1]}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    setInterval(fetchData, 300000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [span]);

  if (!data) {
    return (
      <div className="flex h-full justify-center w-full items-center min-h-72">
        <div className="border-b-2 border-gray-900 border-t-2 h-10 rounded-full w-10 animate-spin dark:border-gray-200"></div>
      </div>
    );
  }

  const summary = {
      data: data,
      details: [
        {
          name: "Max. Power Yield",
          value: data[data.length - 1]["Max. Power Yield"],
        },
        {
          name: "Curtailed Power Yield",
          value: data[data.length - 1]["Curtailed Power Yield"],
        },
        {
          name: "Actual Power Yield",
          value: data[data.length - 1]["Actual Power Yield"],
        }
      ],
    };

    const spanSelector = ["Last 3 days", "Last 7 days", "Last 14 days", "Last 30 days"];

  return (
    <>
      <Card className="h-full w-full sm:mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-3">
                <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                PV Curtailment
                </h3>
                <div className="flex justify-center text-gray-700 text-xs dark:text-gray-400 gap-[6px] items-center relative">
                  <span className="text-xs dark:text-dark-tremor-content font-medium tremor-content tremor-default">
                    {span}
                  </span>
                  <span className="flex flex-1 h-full justify-center cursor-pointer items-center sm:flex-none" onClick={() => setShowSpanSelector(!showSpanSelector)}>
                      <TbSettings2 className="h-5 w-5" />
                  </span>
                  <span className="flex flex-1 h-full justify-center cursor-pointer items-center sm:flex-none" onClick={() => exportFromJSON({ data: data, fileName: `PvCurtailment_${span}`, exportType: exportFromJSON.types.csv })}>
                      <FiDownload className="h-5 w-5" />
                  </span>
                  <span className="flex flex-1 h-full justify-center cursor-pointer items-center sm:flex-none" onClick={fetchData}>
                    <TfiReload className="h-[18px] w-[18px]" />
                  </span>
                  {
                    showSpanSelector && (
                      <ul className="bg-gray-200 border border-gray-300 p-2 rounded-md shadow-md text-sm w-36 absolute dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 mt-2 right-0 top-5 z-10">
                        <li className="p-1 rounded-md">
                          <span className="text-xs font-medium">Select Span</span>
                        </li>
                        <hr className="border-gray-200 dark:border-gray-700 my-1" />
                        {spanSelector.map((span) => (
                          <li
                            key={span}
                            className="p-1 rounded-md text-xs cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-100"
                            onClick={() => {
                              setSpan(span);
                              setShowSpanSelector(false);
                            }}
                          >
                            {span}
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  </div>
                </div>
        <BarChart
          data={summary.data}
          index="Day"
          type="default"
          categories={["Max. Power Yield", "Curtailed Power Yield", "Actual Power Yield"]}
          colors={["blue", "violet", "cyan"]}
          valueFormatter={(value) => `${value?.toFixed(2)} kWh`}
          showLegend={false}
          showYAxis={false}
          yAxisWidth={100}
          showXAxis={true}
          className="h-48 mt-12"
        />
        <List className="mt-2">
          {summary.details.map((item) => (
            <ListItem key={item.name}>
              <div className="flex items-center space-x-2">
                <span
                  className={classNames(
                    statusColor[item.name],
                    "h-0.5 w-3"
                  )}
                  aria-hidden={true}
                />
                <span>Today&apos;s {item.name}</span>
              </div>
              <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                {item?.value?.toFixed(2)} kWh
              </span>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

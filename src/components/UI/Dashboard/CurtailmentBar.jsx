"use client"; // Ensure this is at the top

import { BarChart } from "@/components/Barchart";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
} from "@tremor/react";

export default function CurtailmentBar() {
  const [data, setData] = useState(null);

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
      const response = await fetch("/api/data/CurtailmentBar");
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

  return (
    <>
      <Card className="h-full w-full sm:mx-auto">
        <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          Curtailment Bar
        </h3>
        <BarChart
          data={summary.data}
          index="day"
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

"use client"; // Ensure this is at the top

import { BarChart } from "@/components/Barchart";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";

export default function DailyYieldBar() {
  const [data, setData] = useState(null);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const statusColor = {
    "Daily Power Yield": 'bg-blue-500',
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/DailyYieldBar");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      const formattedData = {
        generator1: result.generator1.map((item) => ({
          day: new Date(item.day).toLocaleDateString("en-PK"),
          "Daily Power Yield": item["Daily Power Yield"],
        })),
        generator2: result.generator2.map((item) => ({
          day: new Date(item.day).toLocaleDateString("en-PK"),
          "Daily Power Yield": item["Daily Power Yield"],
        })),
        generator3: result.generator3.map((item) => ({
          day: new Date(item.day).toLocaleDateString("en-PK"),
          "Daily Power Yield": item["Daily Power Yield"],
        })),
        pv: result.pv.map((item) => ({
          day: new Date(item.day).toLocaleDateString("en-PK"),
          "Daily Power Yield": item["Daily Power Yield"],
        })),
      };
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 300000); // 5 minutes in milliseconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full min-h-24 w-full">
        <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  const summary = [
    {
      name: "Generator 1",
      data: data.generator1,
      details: [
        {
          name: "Daily Power Yield",
          value: data.generator1[data.generator1.length-1]["Daily Power Yield"],
        },
      ],
    },
    {
      name: "Generator 2",
      data: data.generator2,
      details: [
        {
          name: "Daily Power Yield",
          value: data.generator2[data.generator2.length-1]["Daily Power Yield"],
        },
      ],
    },
    {
      name: "Generator 3",
      data: data.generator3,
      details: [
        {
          name: "Daily Power Yield",
          value: data.generator3[data.generator3.length-1]["Daily Power Yield"],
        },
      ],
    },
    {
      name: "PV",
      data: data.pv,
      details: [
        {
          name: "Daily Power Yield",
          value: data.pv[data.pv.length-1]["Daily Power Yield"],
        },
      ],
    }
  ];

  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg h-full">
        <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Daily Power Yield
        </h3>
        <TabGroup>
          <TabList className="mt-8">
            {summary.map((tab) => (
              <Tab key={tab.name} className="font-medium selected:text-blue-500 aria-selected:text-blue-500 aria-selected:border-b-2 border-blue-500">
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {summary.map((generator) => (
              <TabPanel key={generator.name}>
                <BarChart
                  data={generator.data}
                  index="day"
                  categories={["Daily Power Yield"]}
                  colors={["blue", "violet"]}
                  valueFormatter={(value) => `${value.toFixed(2)} kWh`}
                  stack={false}
                  showLegend={false}
                  showYAxis={false}
                  yAxisWidth={100}
                  showXAxis={true}
                  className="mt-8 h-48"
                />
                <List className="mt-2">
                  {generator.details.map((item) => (
                    <ListItem key={item.name}>
                      <div className="flex items-center space-x-2">
                        <span
                          className={classNames(
                            statusColor[item.name],
                            "h-0.5 w-3"
                          )}
                          aria-hidden={true}
                        />
                        <span>Today&apos;s Power Yield</span>
                      </div>
                      <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {item.value.toFixed(2)} kWh
                      </span>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </Card>
    </>
  );
};

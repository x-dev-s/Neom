"use client"; // Ensure this is at the top

import { BarChart } from "@/components/Barchart";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";
import { TbSettings2 } from "react-icons/tb";
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
  const [showSpanSelector, setShowSpanSelector] = useState(false);
  const [span, setSpan] = useState("Last 7 days");

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const statusColor = {
    "Daily Power Yield": 'bg-blue-500',
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/data/DailyYieldBar?span=${span.split(" ")[1]}`);
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

  const spanSelector = ["Last 3 days", "Last 7 days", "Last 14 days", "Last 30 days"];

  return (
    <>
      <Card className="h-full w-full sm:mx-auto">
        <div className="flex flex-wrap justify-between items-center">
        <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Daily Power Yield
        </h3>
        <div className="flex justify-center text-gray-700 text-xs dark:text-gray-400 gap-1 items-center relative">
          <span className="text-xs dark:text-dark-tremor-content font-medium tremor-content tremor-default">
            {span}
          </span>
          <span className="flex flex-1 h-full justify-center p-1 rounded-md cursor-pointer items-center sm:flex-none" onClick={() => setShowSpanSelector(!showSpanSelector)}>
              <TbSettings2 className="h-5 w-5" />
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
        <TabGroup>
          <TabList className="mt-8">
            {summary.map((tab) => (
              <Tab key={tab.name} className="border-blue-500 text-xs aria-selected:border-b-2 aria-selected:text-blue-500 font-medium selected:text-blue-500">
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
                  showLegend={false}
                  showYAxis={false}
                  yAxisWidth={100}
                  showXAxis={true}
                  className="h-48 mt-8"
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
                      <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
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

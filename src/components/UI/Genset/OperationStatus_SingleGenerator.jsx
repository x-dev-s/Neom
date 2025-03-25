'use client';

import { RiCheckboxCircleFill } from '@remixicon/react';
import { useEffect, useState } from 'react';
import { Card, List, ListItem, Tracker } from '@tremor/react';

const colorMapping = {
  Operational: 'emerald-500',
  Downtime: 'red-500',
  Inactive: 'gray-300',
};

export default function OperationStatus_SingleGenerator({id}) {
  const [data, setData] = useState([]);
  const [showSpanSelector, setShowSpanSelector] = useState(false);
  const [span, setSpan] = useState("Last 30 days");
  const [percent, setPercent] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/data/DailyYieldBar_SingleGenerator?id=${id}&span=${span.split(" ")[1]}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result.map((item) => ({ 
        tooltip: new Date(item.Day).toLocaleDateString("en-PK"),
        status: item["Daily Power Yield" > 1] ? "Operational" : "Downtime",
        color: colorMapping[item["Daily Power Yield"] ? "Operational" : "Downtime"],
      })));
      setPercent(result.filter((item) => item["Daily Power Yield"] > 1).length / result.length * 100);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    setInterval(fetchData, 300000);
  }, []);

  if (data.length == 0) {
    return (
      <div className="flex h-full justify-center w-full items-center min-h-72">
        <div className="border-b-2 border-gray-900 border-t-2 h-10 rounded-full w-10 animate-spin dark:border-gray-200"></div>
      </div>
    );
  }
  
  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Device Operation Status
          </h3>
          <span className="inline-flex items-center gap-2 rounded-tremor-full px-3 py-1 text-tremor-default text-tremor-content-emphasis ring-1 ring-inset ring-tremor-ring dark:text-dark-tremor-content-emphasis dark:ring-dark-tremor-ring">
            <span
              className="-ml-0.5 size-2 rounded-tremor-full bg-emerald-500"
              aria-hidden={true}
            />
            Operational
          </span>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <RiCheckboxCircleFill
              className="size-5 shrink-0 text-emerald-500"
              aria-hidden={true}
            />
            <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {`Generator ${id}`}
            </p>
          </div>
          <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {percent.toFixed(2)}% uptime
          </p>
        </div>
        <Tracker data={data} className="mt-4 hidden w-full lg:flex gap-[1px] rounded overflow-hidden" />
        <div className="mt-3 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          <span>{data.length} days ago</span>
          <span>Today</span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span
            tabIndex="1"
            className="inline-flex items-center gap-x-2 rounded-tremor-small bg-tremor-background-subtle px-2 py-0.5 text-tremor-default text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis"
          >
            <span
              className="size-2 rounded-full bg-emerald-500"
              aria-hidden={true}
            />
            Operational
          </span>
          <span
            tabIndex="1"
            className="inline-flex items-center gap-x-2 rounded-tremor-small bg-tremor-background-subtle px-2 py-0.5 text-tremor-default text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis"
          >
            <span
              className="size-2 rounded-full bg-red-500"
              aria-hidden={true}
            />
            Downtime
          </span>
          <span
            tabIndex="1"
            className="inline-flex items-center gap-x-2 rounded-tremor-small bg-tremor-background-subtle px-2 py-0.5 text-tremor-default text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis"
          >
            <span
              className="size-2 rounded-full bg-gray-500"
              aria-hidden={true}
            />
            Maintenance
          </span>
        </div>
        {/* <h3 className="mt-6 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Downtime overview
        </h3> */}
        {/* <List className="mt-2">
          <ListItem>
            <span>29. Sep, 2023</span>
            <span>Down for 1 min</span>
          </ListItem>
          <ListItem>
            <span>21. Oct, 2023</span>
            <span>Down for 2 min</span>
          </ListItem>
          <ListItem>
            <span>24. Nov, 2023 </span>
            <span>Down for 1 min</span>
          </ListItem>
        </List> */}
      </Card>
    </>
  );
}
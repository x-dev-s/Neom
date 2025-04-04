"use client"; // Mark this component as a Client Component
import { cx } from "@/lib/utils";
import { AreaChart as TremorAreaChart } from "@tremor/react";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { TfiReload } from "react-icons/tfi";
import { FiDownload } from "react-icons/fi";
import exportFromJSON from "export-from-json";

// Power Generation Formatter
function powerFormatter(number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal", // No currency symbol
    maximumFractionDigits: 1, // Adjust decimal places
    notation: "compact", // Use compact notation (e.g., 1K, 1M)
    compactDisplay: "short", // Display as "K" for thousand, "M" for million, etc.
  });

  return `${formatter.format(number)} kW`; // Append "W" for watts
}

export default function PowerTrend({ id }) {
  const [data, setData] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const fetchData = async () => {
    try {
      let s, e;
      if (!start) {
        s = new Date(
          Date.now() - 86400000 - new Date().getTimezoneOffset() * 36000
        )
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");
      }
      if (!end) {
        e = new Date(Date.now() - new Date().getTimezoneOffset() * 36000)
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");
      }

      const response = await fetch(
        `/api/data/PowerTrend_SingleGenerator?id=${id}&start=${
          start || s
        }&end=${end || e}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setStart(
      new Date(Date.now() - 86400000 - new Date().getTimezoneOffset() * 36000)
        .toISOString()
        .slice(0, 16)
        .replace("T", " ")
    );
    setEnd(
      new Date(Date.now() - new Date().getTimezoneOffset() * 36000)
        .toISOString()
        .slice(0, 16)
        .replace("T", " ")
    );
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

  const summary = [
    {
      index: 0,
      name: "Apparent Power",
      data: data || [],
      details: [
        {
          value: data[data.length - 1]["Apparent Power"],
          color: "bg-blue-500",
        },
      ],
    },
    {
      index: 0,
      name: "Active Power",
      data: data || [],
      details: [
        {
          value: data[data.length - 1]["Active Power"],
          color: "bg-violet-500",
        },
      ],
    },
    {
      index: 1,
      name: "Reactive Power",
      data: data || [],
      details: [
        {
          value: data[data.length - 1]["Reactive Power"],
          color: "bg-cyan-500",
        },
      ],
    },
  ];

  // Main Component
  return (
    <Card className="h-auto w-full md:h-full sm:mx-auto">
      <div className="w-full sm:mx-auto">
        <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          Active Power Trend
        </h3>
        <p className="text-tremor-content text-tremor-default dark:text-dark-tremor-content leading-6"></p>
        <ul
          role="list"
          className="flex flex-wrap justify-around gap-6 items-center mt-10"
        >
          {summary.map((item, index) => (
            <li
              key={index}
              className="flex flex-col justify-center basis-32 gap-3 items-center"
            >
              <div className="flex space-x-3">
                {item.details.map((detail, detailIndex) => (
                  <span
                    key={detailIndex}
                    className={classNames(detail.color, "w-1 shrink-0 rounded")}
                    aria-hidden={true}
                  />
                ))}
                <p className="text-tremor-content-strong text-tremor-title dark:text-dark-tremor-content-strong">
                  {item.name}
                </p>
              </div>
              <p className="text-md text-tremor-content text-tremor-default dark:text-dark-tremor-content font-medium">
                {item.details
                  .map((detail) => `${detail.value?.toFixed(2)} kW`)
                  .join(", ")}
              </p>
            </li>
          ))}
        </ul>
        <TremorAreaChart
          data={data}
          index="Timestamp"
          colors={["blue", "violet", "cyan"]}
          curveType="monotone"
          categories={["Apparent Power", "Active Power", "Reactive Power"]}
          startEndOnly={true}
          showLegend={false}
          showGradient={false}
          showYAxis={false}
          customTooltip={Tooltip}
          valueFormatter={(value) => value.toFixed(2)}
          className="h-72 dark:fill-gray-500 fill-gray-500 mt-6"
        />
      </div>
      <div className="flex flex-wrap justify-between items-center mt-5 w-full max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-stretch w-full gap-1 items-center">
          <input
            type="datetime-local"
            min={"2025-03-16T00:00"}
            max={end}
            onChange={(e) => setStart(e.target.value)}
            value={
              start ||
              new Date(
                Date.now() - 86400000 - new Date().getTimezoneOffset() * 36000
              )
                .toISOString()
                .slice(0, 16)
                .replace("T", " ")
            }
            className="flex-1 bg-transparent p-2 rounded-md text-gray-600 text-sm w-28 basis-28 dark:bg-gray-800 dark:text-gray-400"
          />
          <span className="text-gray-600 dark:text-gray-400 font-bold">-</span>
          <input
            type="datetime-local"
            min={start}
            max={new Date().toISOString().slice(0, 16)}
            onChange={(e) => setEnd(e.target.value)}
            value={
              end ||
              new Date(Date.now() - new Date().getTimezoneOffset() * 36000)
                .toISOString()
                .slice(0, 16)
                .replace("T", " ")
            }
            className="flex-1 bg-transparent p-2 rounded-md text-gray-600 text-sm w-28 basis-28 dark:bg-gray-800 dark:text-gray-400"
          />
          <span
            className="flex flex-1 bg-blue-500 h-full justify-center p-2 rounded-md text-white cursor-pointer dark:bg-blue-500 dark:text-white items-center sm:flex-none"
            onClick={fetchData}
          >
            <TfiReload className="h-5 w-5" />
          </span>
          <span
            className="flex flex-1 bg-blue-500 h-full justify-center p-2 rounded-md text-white cursor-pointer dark:bg-blue-500 dark:text-white items-center sm:flex-none"
            onClick={() =>
              exportFromJSON({
                data: data,
                fileName: `PowerTrend_${start.slice(0, 10)}_${end.slice(
                  0,
                  10
                )}`,
                exportType: exportFromJSON.types.csv,
              })
            }
          >
            <FiDownload className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Card>
  );
}

const Tooltip = ({ payload, active, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const status = {
    "Apparent Power": "bg-blue-500 dark:bg-blue-500",
    "Active Power": "bg-violet-500 dark:bg-violet-500",
    "Reactive Power": "bg-cyan-500 dark:bg-cyan-500",
  };

  const formatter = {
    'Apparent Power': (number) => `${number.toFixed(2)} kVA`,
    'Active Power': (number) => `${number.toFixed(2)} kW`,
    'Reactive Power': (number) => `${number.toFixed(2)} kVAr`,
  }

  const data = payload.map((item) => ({
    status: item.dataKey,
    value: item.value,
  }));

  return (
    <>
      <div className="bg-white border border-gray-500/10 rounded-md shadow-md text-sm w-60 dark:bg-gray-900 dark:border-gray-400/20 mt-1 px-4 py-2 space-y-1">
        <p className="flex justify-between items-center">
          <span className="font-medium">{label}</span>
        </p>
        <hr className="border-gray-500/10 dark:border-gray-400/20" />
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2.5">
            <span
              className={cx(status[item.status], "size-2 shrink-0 rounded-sm")}
              aria-hidden={true}
            />
            <div className="flex justify-between w-full">
              <span className="text-gray-900 dark:text-gray-50">
                {item.status}
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                  {formatter[item.status](item.value)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

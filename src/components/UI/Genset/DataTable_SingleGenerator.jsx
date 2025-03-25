"use client";

import {
  AreaChart,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useEffect, useState } from "react";
import { TfiReload } from "react-icons/tfi";

export default function DataTable({ id }) {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/data/Table_SingleGenerator?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      let Data = [
        {
          name: "Engine Speed",
          value: result[result.length - 1]["Engine Speed"],
          unit: "RPM",
        },
        {
          name: "Generator Frequency",
          value: result[result.length - 1]["Generator Frequency"],
          unit: "Hz",
        },
        {
          name: "Generator Output",
          value: result[result.length - 1]["Generator Output"],
          unit: "kW",
        },
        {
          name: "Power Factor",
          value: result[result.length - 1]["Power Factor"],
          unit: "",
        },
        {
          name: "Line 1 Voltage",
          value: result[result.length - 1]["Line 1 Voltage"],
          unit: "V",
        },
        {
          name: "Line 2 Voltage",
          value: result[result.length - 1]["Line 2 Voltage"],
          unit: "V",
        },
        {
          name: "Line 3 Voltage",
          value: result[result.length - 1]["Line 3 Voltage"],
          unit: "V",
        },
        {
          name: "Line 1 Current",
          value: result[result.length - 1]["Line 1 Current"],
          unit: "A",
        },
        {
          name: "Line 2 Current",
          value: result[result.length - 1]["Line 2 Current"],
          unit: "A",
        },
        {
          name: "Line 3 Current",
          value: result[result.length - 1]["Line 3 Current"],
          unit: "A",
        },
        {
          name: "Line 1 Active Power",
          value: result[result.length - 1]["Line 1 Active Power"],
          unit: "kW",
        },
        {
          name: "Line 2 Active Power",
          value: result[result.length - 1]["Line 2 Active Power"],
          unit: "kW",
        },
        {
          name: "Line 3 Active Power",
          value: result[result.length - 1]["Line 3 Active Power"],
          unit: "kW",
        },
        {
          name: "Oil Pressure",
          value: result[result.length - 1]["Oil Pressure"],
          unit: "PSI",
        },
        {
          name: "Coolant Temperature",
          value: result[result.length - 1]["Coolant Temperature"],
          unit: "°C",
        },
        {
          name: "Engine Battery Voltage",
          value: result[result.length - 1]["Engine Battery Voltage"],
          unit: "V",
        },
        {
          name: "Charger Voltage",
          value: result[result.length - 1]["Charger Voltage"],
          unit: "V",
        },
      ];
      setData(Data);
      setChartData(result);
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
    <Card className="h-full w-full sm:mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
         Generator 1 Overview
        </h3>
        <span
          className="flex flex-1 h-full justify-center cursor-pointer items-center sm:flex-none"
          onClick={fetchData}
        >
          <TfiReload className="h-[18px] w-[18px]" />
        </span>
      </div>
      <Table className="mt-8 w-full">
        <TableHead>
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Name
            </TableHeaderCell>
            <TableHeaderCell className="text-center text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Value
            </TableHeaderCell>
            <TableHeaderCell className="text-center text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Unit
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Trend
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.name}
              </TableCell>
              <TableCell className="text-center">
                {item.value?.toFixed(2)}
              </TableCell>
              <TableCell className="text-center">{item.unit}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-end">
                  <AreaChart
                    data={chartData}
                    index="Timestamp"
                    categories={[item.name]}
                    showGradient={false}
                    className="h-16 w-72"
                    valueFormatter={(value) => `${value.toFixed(2)} ${item.unit}`}
                    showXAxis={false}
                    showYAxis={false}
                    showTooltip={true}
                    showLegend={false}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

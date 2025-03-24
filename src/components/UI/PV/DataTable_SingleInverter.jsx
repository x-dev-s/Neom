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
      const response = await fetch(`/api/data/Table_SingleInverter?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      let Data = [
        {
          name: "DC Power",
          value: result[result.length - 1]["DC Power"],
          unit: "kW",
        },
        {
          name: "Power Factor",
          value: result[result.length - 1]["Power Factor"],
          unit: "",
        },
        {
          name: "Phase A Voltage",
          value: result[result.length - 1]["Phase A Voltage"],
          unit: "V",
        },
        {
          name: "Phase B Voltage",
          value: result[result.length - 1]["Phase B Voltage"],
          unit: "V",
        },
        {
          name: "Phase C Voltage",
          value: result[result.length - 1]["Phase C Voltage"],
          unit: "V",
        },
        {
          name: "Phase A Current",
          value: result[result.length - 1]["Phase A Current"],
          unit: "A",
        },
        {
          name: "Phase B Current",
          value: result[result.length - 1]["Phase B Current"],
          unit: "A",
        },
        {
          name: "Phase C Current",
          value: result[result.length - 1]["Phase C Current"],
          unit: "A",
        },
        {
          name: "Interior Temperature",
          value: result[result.length - 1]["Interior Temperature"],
          unit: "°C",
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
          PV Curtailment
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

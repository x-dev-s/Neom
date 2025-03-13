"use client"

import React from "react"

import { AreaChart } from "@tremor/react"
import { Card } from "@/components/Card"

const chartdata = [
  {
    date: "Jan 23",
    "Total Load": 500,
    "PV Power": 300,
    "Genset Power": 200,
  },
  {
    date: "Feb 23",
    "Total Load": 400,
    "PV Power": 200,
    "Genset Power": 200,
  },
  {
    date: "Mar 23",
    "Total Load": 300,
    "PV Power": 100,
    "Genset Power": 200,
  },
  {
    date: "Apr 23",
    "Total Load": 200,
    "PV Power": 100,
    "Genset Power": 100,
  },
  {
    date: "May 23",
    "Total Load": 100,
    "PV Power": 100,
    "Genset Power": 0,
  },
  {
    date: "Jun 23",
    "Total Load": 350,
    "PV Power": 100,
    "Genset Power": 250,
  },
  {
    date: "Jul 23",
    "Total Load": 450,
    "PV Power": 100,
    "Genset Power": 350,
  },
  {
    date: "Aug 23",
    "Total Load": 500,
    "PV Power": 200,
    "Genset Power": 300,
  },
  {
    date: "Sep 23",
    "Total Load": 600,
    "PV Power": 300,
    "Genset Power": 300,
  },
  {
    date: "Oct 23",
    "Total Load": 700,
    "PV Power": 300,
    "Genset Power": 400,
  },
  {
    date: "Nov 23",
    "Total Load": 800,
    "PV Power": 300,
    "Genset Power": 500,
  },
  {
    date: "Dec 23",
    "Total Load": 900,
    "PV Power": 300,
    "Genset Power": 600
  }
]

export const TrendLine = () => {

   return (
    <Card className="sm:mx-auto sm:max-w-2xl h-full">
      <div className="flex flex-col gap-16 w-full h-full">
        <div className="flex flex-col gap-4 w-full h-full">
          <h2 className="font-semibold text-tremor-content dark:text-dark-tremor-content">Trend Analysis</h2>
          <AreaChart
            key={"trend"}
            type="default"
            className="h-full w-full sm:block"
            data={chartdata}
            index="date"
            categories={["Total Load", "PV Power", "Genset Power"]}
            showLegend={true}
            colors={["blue", "emerald", "violet"]}
            valueFormatter={(value) => `${value} kW`}
          />
        </div>
      </div>
    </Card>
  )
}
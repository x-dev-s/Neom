"use client"

import React from "react"

import { BarChart } from "../../Barchart"
import { Card } from "@/components/Card"

const chartdata = [
  {
    date: "Jan 23",
    "Max Total Active Power": 500,
    "Curtailed Active Power": 300,
    "Total Active Power": 200,
  },
  {
    date: "Feb 23",
    "Max Total Active Power": 400,
    "Curtailed Active Power": 200,
    "Total Active Power": 200,
  },
  {
    date: "Mar 23",
    "Max Total Active Power": 300,
    "Curtailed Active Power": 100,
    "Total Active Power": 200,
  },
  {
    date: "Apr 23",
    "Max Total Active Power": 200,
    "Curtailed Active Power": 100,
    "Total Active Power": 100,
  },
  {
    date: "May 23",
    "Max Total Active Power": 100,
    "Curtailed Active Power": 100,
    "Total Active Power": 0,
  },
  {
    date: "Jun 23",
    "Max Total Active Power": 350,
    "Curtailed Active Power": 100,
    "Total Active Power": 250,
  },
  {
    date: "Jul 23",
    "Max Total Active Power": 450,
    "Curtailed Active Power": 100,
    "Total Active Power": 350,
  },
  {
    date: "Aug 23",
    "Max Total Active Power": 500,
    "Curtailed Active Power": 200,
    "Total Active Power": 300,
  },
  {
    date: "Sep 23",
    "Max Total Active Power": 600,
    "Curtailed Active Power": 300,
    "Total Active Power": 300,
  },
  {
    date: "Oct 23",
    "Max Total Active Power": 700,
    "Curtailed Active Power": 300,
    "Total Active Power": 400,
  },
  {
    date: "Nov 23",
    "Max Total Active Power": 800,
    "Curtailed Active Power": 300,
    "Total Active Power": 500,
  },
  {
    date: "Dec 23",
    "Max Total Active Power": 900,
    "Curtailed Active Power": 300,
    "Total Active Power": 600
  }
]

export const PvPower = () => {

   return (
    <Card className="sm:mx-auto sm:max-w-2xl h-full">
      <div className="flex flex-col gap-16 w-full h-full">
        <div className="flex flex-col gap-4 w-full h-full">
          <h2 className="font-semibold text-tremor-content dark:text-dark-tremor-content">PV Power</h2>
          <BarChart
            key={"stacked"}
            type={"stacked"}
           className="h-[310px] sm:block"
            data={chartdata}
            index="date"
            categories={["Max Total Active Power", "Curtailed Active Power", "Total Active Power"]}
            showLegend={true}
            colors={["blue", "emerald", "violet"]}
            valueFormatter={(value) => `${value} kW`}
          />
        </div>
      </div>
    </Card>
  )
}
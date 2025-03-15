"use client"; // Ensure this runs on the client side

import { BarChart } from "@/components/Barchart";
import { Card } from "@/components/Card";


const SalesChart = ({ data }: { data: any[] }) => {
  const formatNumber = (number: number) =>
    `${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short",
    }).format(number)}W`;

  return (
    <Card className="sm:mx-auto sm:max-w-2xl h-full">
      <h3 className="font-semibold">Genset Power</h3>
      {/* <p>Lorem ipsum dolor sit amet.</p> */}
      <ul role="list" className="mt-6 flex gap-10">
          <li>
            <div className="flex items-center space-x-1.5">
              <span
                className="size-2.5 rounded-sm bg-tremor-brand dark:bg-dark-tremor-brand"
                aria-hidden={true}
              />
              <span
                className="size-2.5 rounded-sm bg-blue-500"
                aria-hidden={true}
              />
              <p className="text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                Active Power
              </p>
            </div>
            <div className="flex items-center space-x-1.5">
            <p className="mt-0.5 text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              300 kW
            </p>
              <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content">
                +16%
              </span>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-1.5">
              <span
                className="size-2.5 rounded-sm bg-cyan-500"
                aria-hidden={true}
              />
              <p className="text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                Reactive Power
              </p>
            </div>
            <p className="mt-0.5 text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              50 kVAr
            </p>
          </li>
        </ul>
      <BarChart
        data={data}
        index="date"
        categories={["Last Year", "This Year"]}
        colors={["cyan", "blue"]}
        showLegend={false}
        valueFormatter={formatNumber}
        yAxisWidth={50}
        className="mt-8 hidden h-56 sm:block"
      />
      <BarChart
        data={data}
        index="date"
        categories={["Last Year", "This Year"]}
        colors={["cyan", "blue"]}
        showLegend={false}
        valueFormatter={formatNumber}
        showYAxis={false}
        className="mt-8 h-48 sm:hidden"
      />
    </Card>
  );
};
export default SalesChart;

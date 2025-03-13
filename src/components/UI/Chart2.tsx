"use client"; // Ensure this runs on the client side

import { Card } from "@/components/Card";
import { BarChart } from '@/components/StackedBarchart';



const Chart2 = ({ data }: { data: any[] }) => {
  const formatNumber = (number: number) =>
    `${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short",
    }).format(number)}W`;

  function classNames(color: string, className: string): string {
    return `${color} ${className}`;
  }

  const tabs = [
    { name: 'Max Total Active Power ', color: 'bg-blue-500', value: '780 kW' },
    { name: 'Curtalied Active Power', color: 'bg-indigo-500', value: '500 kW' },
    { name: 'Total Active Power', color: 'bg-cyan-500', value: '280 kW' }
  ];

  return (
    <Card className="sm:mx-auto sm:max-w-2xl">
      <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        PV Power Curtaling
      </h3>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {/* Check sales of top 3 regions over time */}
      </p>
      <ul
        role="list"
        className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3"
      >
        {tabs.map((tab: { name: string; color: string; value: string }) => (
          <li
            key={tab.name}
            className="rounded-tremor-small border border-tremor-border px-3 py-2 text-left dark:border-dark-tremor-border"
          >
            <div className="flex items-center space-x-1.5">
              <span
                className={classNames(tab.color, 'size-2.5 rounded-sm')}
                aria-hidden={true}
              />
              <p className="text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                {tab.name}
              </p>
            </div>
            <p className="mt-0.5 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {tab.value}
            </p>
          </li>
        ))}
      </ul>
      <BarChart
        data={data}
        index="date"
        categories={['Europe', 'Asia', 'North America']}
        colors={['blue', 'cyan', 'indigo']}
        showLegend={false}
        valueFormatter={formatNumber}
        yAxisWidth={50}
        stack={true}
        className="mt-6 hidden h-56 sm:block"
      />
      <BarChart
        data={data}
        index="date"
        categories={['Europe', 'Asia', 'North America']}
        colors={['blue', 'cyan', 'indigo']}
        showLegend={false}
        valueFormatter={formatNumber}
        showYAxis={false}
        stack={true}
        className="mt-6 h-48 sm:hidden"
      />
    </Card>
  );
}
export default Chart2;

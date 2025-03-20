'use client'; // Mark this component as a Client Component
import { cx } from "@/lib/utils";
import { AreaChart as TremorAreaChart } from '@tremor/react';
import { useEffect, useState } from 'react';
import { Card } from "@/components/Card";

// Power Generation Formatter
function powerFormatter(number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal', // No currency symbol
    maximumFractionDigits: 1, // Adjust decimal places
    notation: 'compact', // Use compact notation (e.g., 1K, 1M)
    compactDisplay: 'short', // Display as "K" for thousand, "M" for million, etc.
  });

  return `${formatter.format(number)} kW`; // Append "W" for watts
}

export default function PowerTrend() {
  const [data, setData] = useState(null);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data/PowerTrend');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    setInterval(fetchData, 300000);
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full min-h-72 w-full">
        <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  const summary = [
    {
      index: 0,
      name: 'Total Load',
      data: data || [],
      details: [
            {
              value: data[data.length - 1]['Total Load'],
              color: 'bg-blue-500',
            },
          ]
    },
    {
      index: 1,
      name: 'Genset Power',
      data: data || [],
      details: [
            {
              value: data[data.length - 1]['Genset Power'],
              color: 'bg-violet-500',
            },
          ],
    },
    {
      index: 2,
      name: 'PV Power',
      data: data || [],
      details: [
            {
              value: data[data.length - 1]['PV Power'],
              color: 'bg-cyan-500',
            },
          ]
    },
  ];

  // Main Component
  return (
    <Card className="sm:mx-auto sm:max-w-2xl h-auto md:h-full">
      <div className="sm:mx-auto sm:max-w-7xl">
        <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Active Power Trend
        </h3>
        <p className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content"></p>
        <ul role="list" className="mt-10 flex flex-wrap gap-6 items-center justify-around">
          {summary.map((item, index) => (
            <li key={index} className='basis-32 flex flex-col gap-3 items-center justify-center'>
              <div className="flex space-x-3">
                {item.details.map((detail, detailIndex) => (
                  <span
                    key={detailIndex}
                    className={classNames(detail.color, 'w-1 shrink-0 rounded')}
                    aria-hidden={true}
                  />
                ))}
                <p className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {item.name}
                </p>
              </div>
              <p className="font-medium text-md text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {item.details.map((detail) => `${detail.value.toFixed(2)} kW`).join(', ')}
              </p>
            </li>
          ))}
        </ul>
        <TremorAreaChart
          data={data}
          index="Timestamp"
          colors={['blue', 'violet', 'cyan']}
          curveType='monotone'
          categories={['Total Load', 'Genset Power', 'PV Power']}
          showLegend={false}
          startEndOnly={true}
          showGradient={false}
          showYAxis={false}
          yAxisWidth={100}
          valueFormatter={powerFormatter}
          customTooltip={Tooltip}
          className="mt-10 hidden h-72 sm:block bg-white"
        />
        <TremorAreaChart
          data={data}
          index="Timestamp"
          colors={["blue", "violet", "cyan"]}
          curveType='monotone'
          categories={['Total Load', 'Genset Power', 'PV Power']}
          startEndOnly={true}
          showLegend={false}
          showGradient={false}
          showYAxis={false}
          customTooltip={Tooltip}
          valueFormatter={powerFormatter}
          className="mt-6 h-72 sm:hidden"
        />
      </div>
    </Card>
  );
};

const Tooltip = ({ payload, active, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const status = {
    "Total Load": "bg-blue-500 dark:bg-blue-500",
    "Genset Power": "bg-violet-500 dark:bg-violet-500",
    "PV Power": "bg-cyan-500 dark:bg-cyan-500",
  };

  const data = payload.map((item) => ({
    status: item.dataKey,
    value: item.value,
  }));

  return (
    <>
      <div className="mt-1 w-60 space-y-1 rounded-md border border-gray-500/10 bg-white px-4 py-2 text-sm shadow-md dark:border-gray-400/20 dark:bg-gray-900">
      <p className="flex items-center justify-between">
          <span className="font-medium">{label}</span>
        </p>
        <hr className="border-gray-500/10 dark:border-gray-400/20" />
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2.5">
            <span
              className={cx(
                status[item.status],
                "size-2 shrink-0 rounded-sm"
              )}
              aria-hidden={true}
            />
            <div className="flex w-full justify-between">
              <span className="text-gray-900 dark:text-gray-50">
                {item.status}
              </span>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {`${item.value.toFixed(2)} kW`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
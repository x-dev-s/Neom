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
      <div className="flex h-full justify-center w-full items-center min-h-72">
        <div className="border-b-2 border-gray-900 border-t-2 h-10 rounded-full w-10 animate-spin dark:border-gray-200"></div>
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
    <Card className="h-auto md:h-full sm:max-w-2xl sm:mx-auto">
      <div className="sm:max-w-7xl sm:mx-auto">
        <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          Active Power Trend
        </h3>
        <p className="text-tremor-content text-tremor-default dark:text-dark-tremor-content leading-6"></p>
        <ul role="list" className="flex flex-wrap justify-around gap-6 items-center mt-10">
          {summary.map((item, index) => (
            <li key={index} className='flex flex-col justify-center basis-32 gap-3 items-center'>
              <div className="flex space-x-3">
                {item.details.map((detail, detailIndex) => (
                  <span
                    key={detailIndex}
                    className={classNames(detail.color, 'w-1 shrink-0 rounded')}
                    aria-hidden={true}
                  />
                ))}
                <p className="text-tremor-content-strong text-tremor-title dark:text-dark-tremor-content-strong">
                  {item.name}
                </p>
              </div>
              <p className="text-md text-tremor-content text-tremor-default dark:text-dark-tremor-content font-medium">
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
          className="h-72 dark:text-gray-400 hidden mt-10 sm:block"
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
          className="h-72 mt-6 sm:hidden"
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
      <div className="bg-white border border-gray-500/10 rounded-md shadow-md text-sm w-60 dark:bg-gray-900 dark:border-gray-400/20 mt-1 px-4 py-2 space-y-1">
      <p className="flex justify-between items-center">
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
            <div className="flex justify-between w-full">
              <span className="text-gray-900 dark:text-gray-50">
                {item.status}
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-gray-900 dark:text-gray-50 font-medium">
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
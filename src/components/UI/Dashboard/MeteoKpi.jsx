'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Card } from '@tremor/react';

let categories = [
  {
    name: 'Ambient Temperature',
    valueFormatter: (number) => `${number.toFixed(2)} °C`,
  },
  {
    name: 'Ambient Humidity',
    valueFormatter: (number) => `${number.toFixed(2)} %RH`,
  },
  {
    name: 'Slope Transient Irradiation',
    valueFormatter: (number) => `${number.toFixed(2)} W/m²`,
  },
];

export default function MeteoKpi() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data/MeteoKpi');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    setInterval(fetchData, 300000);
  }, []);

  return (
    <dl className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
      {categories.map((item) => (
        <div key={item.name} className='flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full md:w-1/3 min-h-24 overflow-hidden'>
          {data.length === 0 ? (
            <div className="flex h-full justify-center w-full items-center min-h-72">
              <div className="border-b-2 border-gray-900 border-t-2 h-10 rounded-full w-10 animate-spin dark:border-gray-200"></div>
            </div>
          ) : (
            <Card className='h-auto md:h-full'>
              <dt className="text-tremor-content text-tremor-default dark:text-dark-tremor-content font-semibold mb-8">
                {item.name}
              </dt>
              <dd className="flex justify-between items-center my-1">
                <span className="text-md text-tremor-content-strong text-tremor-title dark:text-dark-tremor-content-strong font-medium">
                  {item.valueFormatter(data[data.length - 1]?.[item.name] || 0)}
                </span>
                <span className="text-tremor-content text-tremor-default text-xs dark:text-dark-tremor-content">
                  {`${data[data.length - 1]?.Timestamp}`}
                </span>
              </dd>
              <AreaChart
                data={data}
                index="Timestamp"
                categories={[item.name]}
                showLegend={false}
                showYAxis={false}
                showGridLines={false}
                showGradient={false}
                startEndOnly={true}
                className="h-24 -mb-2 dark:text-dark-tremor-content mt-3"
                showTooltip={false}
              />
            </Card>
          )}
        </div>
      ))}
    </dl>
  );
}

const customTooltipHandler = (props, setselectedChartData) => {
  if (props.active) {
    setselectedChartData((prev) => {
      if (prev?.label === props?.label) return prev;
      return props;
    });
  } else {
    setselectedChartData(null);
  }
  return null;
}
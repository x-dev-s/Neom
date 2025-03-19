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
  const [selectedChartData, setselectedChartData] = useState(null);
  const payload = selectedChartData?.payload[0];

  const fetchData = async () => {
    try {
      const response = await fetch('/api/MeteoKpi');
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
    setInterval(() => {
      fetchData();
    }, 300000);
  }, []);

  return (
    <dl className="w-full h-full flex flex-wrap md:flex-nowrap gap-3">
      {categories.map((item) => (
        <div key={item.name} className='w-full md:w-1/3 min-h-24 h-auto md:h-full bg-white overflow-hidden rounded-2xl flex items-center justify-center'>
          {data.length === 0 ? (
            <div className="flex justify-center items-center h-full min-h-72 w-full">
              <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          ) : (
            <Card className='h-auto md:h-full'>
              <dt className="font-semibold text-tremor-default text-tremor-content dark:text-dark-tremor-content mb-8">
                {item.name}
              </dt>
              <dd className="mt-1 flex items-center justify-between">
                <span className="text-tremor-title font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {payload ? item.valueFormatter(payload?.payload[item.name]) : item.valueFormatter(data[data.length - 1]?.[item.name] || 0)}
                </span>
                <span className="text-xs text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  {payload ? `${payload?.payload?.Timestamp}` : `${data[data.length - 1]?.Timestamp}`}
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
                className="-mb-2 mt-3 h-24"
                customTooltip={(props) => {
                  customTooltipHandler(props, setselectedChartData);
                }}
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
'use client';
import { cx } from "@/lib/utils";
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
  {
    name: 'Wind Speed',
    valueFormatter: (number) => `${number.toFixed(2)} m/s`,
  },
  {
    name: 'Wind Angle',
    valueFormatter: (number) => `${number.toFixed(2)} °`,
  },
  {
    name: 'PV Module Temperature',
    valueFormatter: (number) => `${number.toFixed(2)} °C`,
  }
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
    <>
    <dl className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
      {categories.slice(0,3).map((item) => (
        <div key={item.name} className='flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full md:w-1/3 min-h-24 md:basis-1/3 overflow-hidden'>
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
                valueFormatter={(value) => item.valueFormatter(value)}
                className="h-24 -mb-2 dark:text-dark-tremor-content mt-3"
                showTooltip={false}
                customTooltip={Tooltip}
              />
            </Card>
          )}
        </div>
      ))}
    </dl>
    <dl className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
    {categories.slice(3,6).map((item) => (
      <div key={item.name} className='flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full md:w-1/3 min-h-24 md:basis-1/3 overflow-hidden'>
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
              valueFormatter={(value) => item.valueFormatter(value)}
              className="h-24 -mb-2 dark:text-dark-tremor-content mt-3"
              showTooltip={false}
              customTooltip={Tooltip}
            />
          </Card>
        )}
      </div>
    ))}
  </dl>
  </>
  );
}

const Tooltip = ({ payload, active, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const formatter = {
    "Ambient Temperature": (value) => `${value.toFixed(2)} °C`,
    "Ambient Humidity": (value) => `${value.toFixed(2)} %RH`,
    "Slope Transient Irradiation": (value) => `${value.toFixed(2)} W/m²`,
    "Wind Speed": (value) => `${value.toFixed(2)} m/s`,
    "Wind Angle": (value) => `${value.toFixed(2)} °`,
    "PV Module Temperature": (value) => `${value.toFixed(2)} °C`,
  };

  const data = payload.map((item) => ({
    status: item.dataKey,
    value: item.value,
  }));

  return (
    <>
      <div className="bg-white border border-gray-500/10 rounded-md shadow-md text-sm max-w-72 dark:bg-gray-900 dark:border-gray-400/20 mt-1 px-4 py-2 space-y-1">
      <p className="flex justify-between items-center">
          <span className="font-medium">{label}</span>
        </p>
        <hr className="border-gray-500/10 dark:border-gray-400/20" />
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2.5">
            <span
              className={cx(
                "bg-blue-500 dark:bg-blue-500",
                "size-2 shrink-0 rounded-sm"
              )}
              aria-hidden={true}
            />
            <div className="flex justify-between w-full gap-6">
              <span className="text-gray-900 dark:text-gray-50 text-wrap">
                {item.status}
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-gray-900 dark:text-gray-50 font-medium">
                  {formatter[item.status](item.value)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
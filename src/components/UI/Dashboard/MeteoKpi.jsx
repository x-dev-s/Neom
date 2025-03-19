'use client';

import { useEffect, useState, useCallback } from 'react';
import { AreaChart, Card } from '@tremor/react';

let data = [];
let categories = [];

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
};

function CustomChart({ item }) {
  const [selectedChartData, setselectedChartData] = useState(null);
  const payload = selectedChartData?.payload[0];

  const formattedValue = payload
    ? item.valueFormatter(payload?.payload[item.name])
    : item.valueFormatter(data[data.length-1]?.[item.name] || 0);

  return (
    <Card className='h-auto md:h-full'>
      <dt className="font-semibold text-tremor-default text-tremor-content dark:text-dark-tremor-content mb-8">
        {item.name}
      </dt>
      <dd className="mt-1 flex items-center justify-between">
        <span className="text-tremor-title font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {formattedValue}
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
  );
}

export default function MeteoKpi() {
  const [result, setResult] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/MeteoKpi');
      if (response.ok) {
        const result = await response.json();
        setResult(result);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 300000);
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [fetchData]);

  useEffect(() => {
    if (Array.isArray(result) && result.length > 0) {
      data = result;
      categories = [
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
    }
  }, [result]);

  return (
    <dl className="w-full h-full flex flex-wrap md:flex-nowrap gap-3">
      {categories.map((item) => (
        <div key={item.name} className='w-full md:w-1/3 min-h-24 h-auto md:h-full bg-white overflow-hidden rounded-2xl flex items-center justify-center'>
          <CustomChart item={item} />
        </div>
      ))}
    </dl>
  );
}

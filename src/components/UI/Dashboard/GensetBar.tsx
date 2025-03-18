"use client"; // Ensure this is at the top

import { BarChart } from "@/components/Barchart";
import { Card } from "@/components/Card";
import { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react';

interface barchart {
  date: string;
  TotalActivePower_G1: number;
  TotalReactivePower_G1: number;
  TotalActivePower_G2: number;
  TotalReactivePower_G2: number;
  TotalActivePower_G3: number;
  TotalReactivePower_G3: number;
}

interface ApiResponse {
  generator1: barchart[];
  generator2: barchart[];
  generator3: barchart[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const valueFormatter = (value: number, category: any) =>
 {
    if (category === 'TotalActivePower') {
      return `${value.toFixed(2)} kW`;
    } else if (category === 'TotalReactivePower') {
      return `${value.toFixed(2)} kVAr`;
    }
    return value;
  }

const statusColor: { [key: string]: string } = {
  TotalActivePower: 'bg-blue-500',
  TotalReactivePower: 'bg-violet-500',
};

export default function GeneratorCharts() {
  const [data, setData] = useState<ApiResponse | null>(null);


  const fetchData= async() => {
    try {
      const response = await fetch('/api/GensetBar');
      const result: ApiResponse = await response.json();
      console.log(result);
      setData(result);
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

  if (!data) {
    return<div className="flex justify-center items-center h-full w-full"><div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div></div>;
  }

  const summary = [
    {
      index : 0,
      name: 'Generator 1',
      data: data.generator1,
      details: [
        {
          name: 'TotalActivePower',
          value: data.generator1[0].TotalActivePower_G1,
        },
        {
          name: 'TotalReactivePower',
          value: data.generator1[0].TotalReactivePower_G1,
        },
      ],
    },
    {
      index : 1,
      name: 'Generator 2',
      data: data.generator2,
      details: [
        {
          name: 'TotalActivePower',
          value: data.generator2[0].TotalActivePower_G2,
        },
        {
          name: 'TotalReactivePower',
          value: data.generator2[0].TotalReactivePower_G2,
        },
      ],
    },
    {
      index : 2,
      name: 'Generator 3',
      data: data.generator3,
      details: [
        {
          name: 'TotalActivePower',
          value: data.generator3[0].TotalActivePower_G3,
        },
        {
          name: 'TotalReactivePower',
          value: data.generator3[0].TotalReactivePower_G3,
        },
      ],
    },
  ];

  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg">
        <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Genset Power
        </h3>
        <TabGroup>
          <TabList className="mt-8">
            {summary.map((tab) => (
              <Tab key={tab.name} className="font-medium">
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {summary.map((generator) => (
              <TabPanel key={generator.name}>
                <BarChart
                  data={generator.data}
                  index="Timestamp"
                  categories={generator.index == 0 ? ['TotalActivePower_G1', 'TotalReactivePower_G1'] : generator.index == 1 ? ['TotalActivePower_G2', 'TotalReactivePower_G2'] : ['TotalActivePower_G3', 'TotalReactivePower_G3']}
                  colors={['blue', 'violet']}
                  valueFormatter={(value) => `${value.toFixed(2)} kW`}
                  stack={false}
                  showLegend={false}
                  showYAxis={true}
                  yAxisWidth={75}
                  showXAxis={true}
                  startEndOnly={true}
                  className="mt-8 h-48"
                />
                <List className="mt-2">
                  {generator.details.map((item) => (
                    <ListItem key={item.name}>
                      <div className="flex items-center space-x-2">
                        <span
                          className={classNames(
                            statusColor[item.name],
                            'h-0.5 w-3',
                          )}
                          aria-hidden={true}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {valueFormatter(item.value, item.name)}
                      </span>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </Card>
    </>
  );
}
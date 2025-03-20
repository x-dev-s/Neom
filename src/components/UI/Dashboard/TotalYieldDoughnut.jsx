'use client';

import { Card, DonutChart, List, ListItem } from '@tremor/react';
import { useEffect, useState } from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}


export default function TotalYieldDoughnut() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/data/ActivePowerDoughnut');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
        setInterval(fetchData, 300000);
    }, []);

    if (data.length === 0) {
        return (
          <div className="flex h-full justify-center w-full items-center min-h-72">
            <div className="border-b-2 border-gray-900 border-t-2 h-10 rounded-full w-10 animate-spin dark:border-gray-200"></div>
          </div>
        );
      }
    
    const summary = data.length > 0 ? [
        {
            name: 'PV',
            value: data[0]?.PV,
            share: data[0]?.PV/ data[0]["Total Load"] * 100,
            color: 'bg-blue-500',
        },
        {
            name: 'Generator 1',
            value: data[0]["Generator 1"],
            share: data[0]["Generator 1"]/ data[0]["Total Load"] * 100,
            color: 'bg-violet-500'
        },
        {
            name: 'Generator 2',
            value: data[0]["Generator 2"],
            share: data[0]["Generator 2"]/ data[0]["Total Load"] * 100,
            color: 'bg-cyan-500'
        },
        {
            name: 'Generator 3',
            value: data[0]["Generator 3"],
            share: data[0]["Generator 3"]/ data[0]["Total Load"] * 100,
            color: 'bg-fuchsia-500'
        },
    ] : [];
    
    return (
        <>
            <Card className="h-auto w-full md:h-full sm:mx-auto">
                <h3 className="text-tremor-content-strong text-tremor-default dark:text-dark-tremor-content-strong font-semibold">
                    Total Active Power
                </h3>
                <DonutChart
                    className="h-52 mt-8"
                    data={summary}
                    category="value"
                    index="name"
                    customTooltip={customTooltip}
                    valueFormatter={(value) => `${value.toFixed(2)} kW`}
                    colors={['blue', 'violet', 'cyan', 'fuchsia']}
                />
                <List className="mt-2">
                    {summary.map((item) => (
                        <ListItem key={item.name} className="space-x-6">
                            <div className="flex items-center space-x-2.5 truncate">
                                <span
                                    className={classNames(
                                        item.color,
                                        'size-2.5 shrink-0 rounded-sm',
                                    )}
                                    aria-hidden={true}
                                />
                                <span className="dark:text-dark-tremor-content-emphasis truncate">
                                    {item.name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium tabular-nums">
                                    {`${item.value?.toFixed(2)} kW`}
                                </span>
                                <span className="bg-tremor-background-subtle rounded-tremor-small text-tremor-content-emphasis text-tremor-label dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis font-medium px-1.5 py-0.5 tabular-nums">
                                    {item.share.toFixed(2)}%
                                </span>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </>
    );
}

const customTooltip = (props) => {
    const status = {
        'PV': 'bg-blue-500',
        'Generator 1': 'bg-violet-500',
        'Generator 2': 'bg-cyan-500',
        'Generator 3': 'bg-fuchsia-500',
    };
    const { payload, active, label } = props;
    if (!active || !payload) return null;
    const categoryPayload = payload[0];
  
    if (!categoryPayload) return null;
    return (
      <div className="flex bg-tremor-background bg-white border border-tremor-border justify-between rounded-lg rounded-tremor-default shadow-tremor-dropdown text-tremor-default w-full dark:bg-dark-tremor-background dark:bg-gray-900 dark:border-dark-tremor-border dark:border-gray-700 dark:shadow-dark-tremor-dropdown items-center min-w-52 px-2.5 py-2 space-x-4">
        <div className="flex items-center space-x-2 truncate">
          <span
            className={classNames(
                status[categoryPayload.name],
                'size-2.5 shrink-0 rounded-sm',
            )}
            aria-hidden={true}
          />
          <p className="text-tremor-content dark:text-dark-tremor-content truncate">
            {categoryPayload.name}
          </p>
        </div>
        <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            {`${categoryPayload.value.toFixed(2)} kW`}
        </p>
      </div>
    );
  };
  
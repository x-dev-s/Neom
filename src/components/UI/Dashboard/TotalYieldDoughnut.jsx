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
            const response = await fetch('/api/ActivePowerDoughnut');
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
        setInterval(() => {
            fetchData();
        }, 300000);
    }, []);

    if (data.length === 0) {
        return (
          <div className="flex justify-center items-center h-full min-h-24 w-full">
            <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
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
            color: 'bg-indigo-500'
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
            <Card className="sm:mx-auto sm:max-w-lg h-auto md:h-full">
                <h3 className="text-tremor-default font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Total Active Power
                </h3>
                <DonutChart
                    className="mt-8 h-52"
                    data={summary}
                    category="value"
                    index="name"
                    showTooltip={false}
                    valueFormatter={(value) => `${value.toFixed(2)} kW`}
                    colors={['blue', 'violet', 'indigo', 'fuchsia']}
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
                                <span className="truncate dark:text-dark-tremor-content-emphasis">
                                    {item.name}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                    {`${item.value?.toFixed(2)} kW`}
                                </span>
                                <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
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
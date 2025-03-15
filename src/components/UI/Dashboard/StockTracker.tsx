'use client';

import { SparkAreaChart } from '@tremor/react';
import { Card } from '@/components/Card';

interface StockData {
  date: string;
  [key: string]: string | number;
}

interface StockSummary {
  ticker: string;
  description: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

interface StockTrackerProps {
  data: StockData[];
  summary: StockSummary[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function StockTracker({ data, summary }: StockTrackerProps) {
  return (
    <dl className="space-y-6 p-4px sm:mx-auto sm:max-w-md">
      {summary.map((stock) => (
        <Card
          key={stock.ticker}
          className="flex items-center justify-between space-x-4 p-4"
        >
          <div className="truncate">
            <dt className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {stock.ticker}
            </dt>
            <dl className="truncate text-tremor-label text-tremor-content dark:text-dark-tremor-content">
              {stock.description}
            </dl>
          </div>
          <div className="flex items-center space-x-3">
            <SparkAreaChart
              data={data}
              index="date"
              categories={[stock.ticker]}
              showGradient={true}
              colors={stock.changeType === 'positive' ? ['emerald'] : ['red']}
              className="h-8 w-24 flex-none sm:w-28"
            />
            <div
              className={classNames(
                stock.changeType === 'positive'
                  ? 'text-emerald-700 dark:text-emerald-500'
                  : 'text-red-700 dark:text-red-500',
                'flex w-28 items-center justify-end space-x-2 sm:w-32',
              )}
            >
              <dd className="text-tremor-default font-medium">
                {stock.value}
              </dd>
              <dd
                className={classNames(
                  stock.changeType === 'positive'
                    ? 'bg-emerald-100 dark:bg-emerald-400/10'
                    : 'bg-red-100 dark:bg-red-400/10',
                  'rounded px-1.5 py-1 text-tremor-label font-medium tabular-nums',
                )}
              >
                {stock.change}
              </dd>
            </div>
          </div>
        </Card>
      ))}
    </dl>
  );
}

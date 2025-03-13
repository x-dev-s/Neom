import { AreaChart } from '@tremor/react';
import React from 'react';

// Define types for the data
interface DataPoint {
  date: string;
  'Actual costs': number;
  'Potential costs': number;
  'Potential savings': number;
}

interface SummaryItem {
  category: string;
  total: string;
  color: string | null;
}

interface CustomTooltipProps {
  payload?: Array<{ payload: DataPoint; dataKey: string; value: number; color: string }>;
  active?: boolean;
  label?: string;
}

// Props for the component (if any)
interface ExampleProps {
  // Add any props if needed
}

// Utility function to join class names
function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Data
const data: DataPoint[] = [
  {
    date: 'Jan 23',
    'Actual costs': 42340,
    'Potential costs': 32330,
    'Potential savings': -23.6,
  },
  {
    date: 'Feb 23',
    'Actual costs': 50120,
    'Potential costs': 40100,
    'Potential savings': -20.2,
  },
  // Add more data points as needed
];

const summary: SummaryItem[] = [
  {
    category: 'Actual costs',
    total: '$540,690',
    color: 'bg-blue-500',
  },
  {
    category: 'Potential costs',
    total: '$422,300',
    color: 'bg-cyan-500',
  },
  {
    category: 'Potential savings (%)',
    total: '-21.9%',
    color: null,
  },
  {
    category: 'Potential savings ($)',
    total: '$118,390',
    color: null,
  },
];

// Currency formatter
function currencyFormatter(number: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 1,
    notation: 'compact',
    compactDisplay: 'short',
  });

  return formatter.format(number);
}

// Custom Tooltip Component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload, active, label }) => {
  if (!active || !payload) return null;

  return (
    <div className="rounded-tremor-default border border-tremor-border bg-tremor-background text-tremor-default shadow-tremor-dropdown dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:shadow-dark-tremor-dropdown">
      <div className="border-b border-tremor-border px-4 py-2 dark:border-dark-tremor-border">
        <p className="font-medium text-tremor-content dark:text-dark-tremor-content">
          {label}
        </p>
      </div>
      <div className="px-4 py-2">
        <div className="flex items-center justify-between space-x-8">
          <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Potential savings
          </p>
          <span
            className={classNames(
              payload[0].payload?.['Potential savings'] < 0
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-400'
                : 'bg-red-100 text-red-800 dark:bg-red-400/10 dark:text-red-400',
              'inline-flex rounded px-2 py-0.5 text-tremor-label font-medium',
            )}
          >
            {payload[0].payload?.['Potential savings']}&#37;
          </span>
        </div>
        <div className="mt-2 space-y-1">
          {payload.map((category, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between space-x-8"
            >
              <div className="flex items-center space-x-2">
                <span
                  className={`h-1 w-3 shrink-0 rounded-sm bg-${category.color}-500`}
                  aria-hidden={true}
                />
                <p className="text-tremor-content dark:text-dark-tremor-content">
                  {category.dataKey}
                </p>
              </div>
              <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {currencyFormatter(category.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Component
const AreaChartComponent: React.FC<ExampleProps> = () => {
  return (
    <>
      <div className="sm:mx-auto sm:max-w-7xl">
        <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Actual costs vs. potential costs
        </h3>
        <p className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt
        </p>
        <ul role="list" className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {summary.map((item, index) => (
            <li key={index}>
              <div className="flex space-x-3">
                {item.color && (
                  <span
                    className={classNames(item.color, 'w-1 shrink-0 rounded')}
                    aria-hidden={true}
                  />
                )}
                <p className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {item.total}
                </p>
              </div>
              {item.color !== null ? (
                <p className="pl-4 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  {item.category}
                </p>
              ) : (
                <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  {item.category}
                </p>
              )}
            </li>
          ))}
        </ul>
        <AreaChart
          data={data}
          index="date"
          categories={['Actual costs', 'Potential costs']}
          showLegend={false}
          showGradient={false}
          yAxisWidth={55}
          valueFormatter={currencyFormatter}
          customTooltip={CustomTooltip}
          className="mt-10 hidden h-72 sm:block"
        />
        <AreaChart
          data={data}
          index="date"
          categories={['Actual costs', 'Potential costs']}
          showLegend={false}
          showGradient={false}
          showYAxis={false}
          startEndOnly={true}
          valueFormatter={currencyFormatter}
          customTooltip={CustomTooltip}
          className="mt-6 h-72 sm:hidden"
        />
      </div>
    </>
  );
};

export default AreaChartComponent;
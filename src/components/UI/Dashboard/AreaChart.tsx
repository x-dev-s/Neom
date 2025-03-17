'use client'; // Mark this component as a Client Component

import { AreaChart } from '@tremor/react';
// import React from 'react';
import { Card } from "@/components/Card";

// Define types for the data
// interface DataPoint {
//   date: string;
//   'Genset Loads': number;
//   'PV': number;
//   'Potential savings': number;
// }

// interface SummaryItem {
//   category: string;
//   total: string;
//   color: string | null;
// }

// interface CustomTooltipProps {
//   payload?: Array<{ payload: DataPoint; dataKey: string; value: number; color: string }>;
//   active?: boolean;
//   label?: string;
// }

// Props for the component (if any)
interface ExampleProps {
  // Add any props if needed
}

// Utility function to join class names
function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {    date: 'Jan 23',    'Genset Loads': 42340,    'PV': 32330,    'Potential savings': -23.6,  },  {    date: 'Feb 23',    'Genset Loads': 50120,    'PV': 40100,    'Potential savings': -20.2,  },  {    date: 'Mar 23',    'Genset Loads': 45190,    'PV': 38240,    'Potential savings': -15.4,  },  {    date: 'Apr 23',    'Genset Loads': 56420,    'PV': 31200,    'Potential savings': -44.8,  },  {    date: 'May 23',    'Genset Loads': 40420,    'PV': 34900,    'Potential savings': -13.8,  },  {    date: 'Jun 23',    'Genset Loads': 47010,    'PV': 36800,    'Potential savings': -21.9,  },  {    date: 'Jul 23',    'Genset Loads': 47490,    'PV': 34560,    'Potential savings': -27.3,  },  {    date: 'Aug 23',    'Genset Loads': 39610,    'PV': 31260,    'Potential savings': -21.8,  },  {    date: 'Sep 23',    'Genset Loads': 45860,    'PV': 29240,    'Potential savings': -36.2,  },  {    date: 'Oct 23',    'Genset Loads': 50910,    'PV': 31220,    'Potential savings': -38.7,  },  {    date: 'Nov 23',    'Genset Loads': 49190,    'PV': 33020,    'Potential savings': -32.9,  },  {    date: 'Dec 23',    'Genset Loads': 55190,    'PV': 36090,    'Potential savings': -34.5,  },
];

const summary = [
  {    category: 'Genset Loads',    total: '540,690',    color: 'bg-blue-500',  },  {    category: 'PV',    total: '422,300',    color: 'bg-cyan-500',  },  {    category: 'Potential savings (%)',    total: '-21.9%',    color: null,  },  {    category: 'Potential savings (W)',    total: 'W118,390',    color: null,  },
];


  // Power Generation Formatter
function powerFormatter(number: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal', // No currency symbol
    maximumFractionDigits: 1, // Adjust decimal places
    notation: 'compact', // Use compact notation (e.g., 1K, 1M)
    compactDisplay: 'short', // Display as "K" for thousand, "M" for million, etc.
  });

  return `${formatter.format(number)}W`; // Append "W" for watts
}

// Main Component
const AChart: React.FC<ExampleProps> = () => {
  return (
    <Card className="sm:mx-auto sm:max-w-2xl">
      <div className="sm:mx-auto sm:max-w-7xl">
        <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Genset Loads vs. PV
        </h3>
        <p className="text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
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
          categories={['Genset Loads', 'PV']}
          showLegend={false}
          showGradient={false}
          yAxisWidth={55}
          valueFormatter={powerFormatter}
          className="mt-10 hidden h-72 sm:block"
        />
        <AreaChart
          data={data}
          index="date"
          categories={['Genset Loads', 'PV']}
          showLegend={false}
          showGradient={false}
          showYAxis={false}
          startEndOnly={true}
          valueFormatter={powerFormatter}
          className="mt-6 h-72 sm:hidden"
        />
      </div>
      </Card>
  );
};

export default AChart;
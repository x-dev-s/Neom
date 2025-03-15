'use client';

import {
  RiCheckboxCircleFill,
  RiCloudFill,
  RiMapPin2Fill,
  RiTimeFill,
} from '@remixicon/react';
import { Card, Tracker } from '@tremor/react';

interface TrackerProps {
  title?: string;
  location?: string;
  lastSync?: string;
  status?: string;
  data: {
    tooltip: string;
    status: string;
    color?: string;
  }[];
}

const colorMapping = {
  Operational: 'emerald-500',
  Downtime: 'red-500',
  Inactive: 'gray-300',
};

export default function TrackerComponent({ 
  title = "System Status",
  location = "US-East 1",
  lastSync = "23/12/23 14:01",
  status = "Operational",
  data 
}: TrackerProps) {
  
  const combinedData = data.map((item) => ({
    ...item,
    color: colorMapping[item.status as keyof typeof colorMapping],
  }));

  return (
    <Card className="sm:mx-auto sm:max-w-xl">
      <div className="flex space-x-3">
        <span
          className="w-1 shrink-0 rounded bg-emerald-500"
          aria-hidden={true}
        />
        <div>
          <div className="flex items-center space-x-1.5">
            <RiCheckboxCircleFill
              className="size-5 shrink-0 text-emerald-500"
              aria-hidden={true}
            />
            <span className="text-tremor-default font-medium text-emerald-500">
              {status}
            </span>
          </div>
          <h3 className="mt-2 text-tremor-title font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {title}
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              tabIndex={1}
              className="inline-flex items-center gap-1.5 rounded-tremor-small bg-tremor-background-subtle px-2.5 py-1 text-tremor-label font-medium text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content"
            >
              <RiMapPin2Fill
                className="-ml-0.5 size-4 shrink-0"
                aria-hidden={true}
              />
              {location}
            </span>
            <span
              tabIndex={1}
              className="inline-flex items-center gap-1.5 rounded-tremor-small bg-tremor-background-subtle px-2.5 py-1 text-tremor-label font-medium text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content"
            >
              <RiCloudFill
                className="-ml-0.5 size-4 shrink-0"
                aria-hidden={true}
              />
              Synced
            </span>
            <span
              tabIndex={1}
              className="inline-flex items-center gap-1.5 rounded-tremor-small bg-tremor-background-subtle px-2.5 py-1 text-tremor-label font-medium text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content"
            >
              <RiTimeFill
                className="-ml-0.5 size-4 shrink-0"
                aria-hidden={true}
              />
              Last run: {lastSync}
            </span>
          </div>
        </div>
      </div>
      <Tracker
        data={combinedData.slice(30, 90)}
        className="mt-6 hidden sm:flex"
      />
      <Tracker
        data={combinedData.slice(60, 90)}
        className="mt-6 flex sm:hidden"
      />

      <div className="mt-3 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        <span className="hidden sm:block">60 days ago</span>
        <span className="sm:hidden">30 days ago</span>
        <span>Today</span>
      </div>
    </Card>
  );
}
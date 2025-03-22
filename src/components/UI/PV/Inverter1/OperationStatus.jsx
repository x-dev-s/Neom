// 'use client';

import { RiCheckboxCircleFill } from '@remixicon/react';
import { Card, List, ListItem, Tracker } from '@tremor/react';

const data = [
  {
    tooltip: '23 Sep, 2022',
    status: 'Operational',
  },
  {
    tooltip: '24 Sep, 2022',
    status: 'Operational',
  },
  {
    tooltip: '25 Sep, 2022',
    status: 'Operational',
  },
  {
    tooltip: '26 Sep, 2022',
    status: 'Operational',
  },
  {
    tooltip: '27 Sep, 2022',
    status: 'Operational',
  },
  {
    tooltip: '28 Sep, 2022',
    status: 'Operational',
  },
  {
    tooltip: '29 Sep, 2022',
    status: 'Downtime',
  },
  {
    tooltip: '30 Sep, 2022',
    status: 'Operational',
  },
  {
    tooltip: '1 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '2 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '3 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '4 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '5 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '6 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '7 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '8 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '9 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '10 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '11 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '12 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '13 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '14 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '15 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '16 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '17 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '18 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '19 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '20 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '21 Oct, 2022',
    status: 'Downtime',
  },
  {
    tooltip: '22 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '23 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '24 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '25 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '26 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '27 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '28 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '29 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '30 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '31 Oct, 2022',
    status: 'Operational',
  },
  {
    tooltip: '1 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '2 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '3 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '4 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '5 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '6 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '7 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '8 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '9 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '10 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '11 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '12 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '13 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '14 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '15 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '16 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '17 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '18 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '19 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '20 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '21 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '22 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '23 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '24 Nov, 2022',
    status: 'Downtime',
  },
  {
    tooltip: '25 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '26 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '27 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '28 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '29 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '30 Nov, 2022',
    status: 'Operational',
  },
  {
    tooltip: '1 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '2 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '3 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '4 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '5 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '6 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '7 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '8 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '9 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '10 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '11 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '12 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '13 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '14 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '15 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '16 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '17 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '18 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '19 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '20 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '21 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '22 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '23 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '24 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '25 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '26 Dec, 2022',
    status: 'Operational',
  },
  {
    tooltip: '27 Dec, 2022',
    status: 'Operational',
  },
];

const colorMapping = {
  Operational: 'emerald-500',
  Downtime: 'red-500',
  Inactive: 'gray-300',
};

const combinedData = data.map((item) => {
  return {
    ...item,
    color: colorMapping[item.status],
  };
});

export default function OperationStatus() {
  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Lena&#39;s Website
          </h3>
          <span className="inline-flex items-center gap-2 rounded-tremor-full px-3 py-1 text-tremor-default text-tremor-content-emphasis ring-1 ring-inset ring-tremor-ring dark:text-dark-tremor-content-emphasis dark:ring-dark-tremor-ring">
            <span
              className="-ml-0.5 size-2 rounded-tremor-full bg-emerald-500"
              aria-hidden={true}
            />
            Operational
          </span>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <RiCheckboxCircleFill
              className="size-5 shrink-0 text-emerald-500"
              aria-hidden={true}
            />
            <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              example.com
            </p>
          </div>
          <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            99.9% uptime
          </p>
        </div>
        <Tracker data={combinedData} className="mt-4 hidden w-full lg:flex gap-[1px] rounded overflow-hidden" />
        <Tracker
          data={combinedData.slice(30, 90)}
          className="mt-3 hidden w-full sm:flex lg:hidden"
        />
        <Tracker
          data={combinedData.slice(60, 90)}
          className="mt-3 flex w-full sm:hidden"
        />
        <div className="mt-3 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          <span className="hidden lg:block">90 days ago</span>
          <span className="hidden sm:block lg:hidden">60 days ago</span>
          <span className="sm:hidden">30 days ago</span>
          <span>Today</span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span
            tabIndex="1"
            className="inline-flex items-center gap-x-2 rounded-tremor-small bg-tremor-background-subtle px-2 py-0.5 text-tremor-default text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis"
          >
            <span
              className="size-2 rounded-full bg-emerald-500"
              aria-hidden={true}
            />
            Operational
          </span>
          <span
            tabIndex="1"
            className="inline-flex items-center gap-x-2 rounded-tremor-small bg-tremor-background-subtle px-2 py-0.5 text-tremor-default text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis"
          >
            <span
              className="size-2 rounded-full bg-red-500"
              aria-hidden={true}
            />
            Downtime
          </span>
          <span
            tabIndex="1"
            className="inline-flex items-center gap-x-2 rounded-tremor-small bg-tremor-background-subtle px-2 py-0.5 text-tremor-default text-tremor-content dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis"
          >
            <span
              className="size-2 rounded-full bg-gray-500"
              aria-hidden={true}
            />
            Maintenance
          </span>
        </div>
        <h3 className="mt-6 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Downtime overview
        </h3>
        <List className="mt-2">
          <ListItem>
            <span>29. Sep, 2023</span>
            <span>Down for 1 min</span>
          </ListItem>
          <ListItem>
            <span>21. Oct, 2023</span>
            <span>Down for 2 min</span>
          </ListItem>
          <ListItem>
            <span>24. Nov, 2023 </span>
            <span>Down for 1 min</span>
          </ListItem>
        </List>
      </Card>
    </>
  );
}
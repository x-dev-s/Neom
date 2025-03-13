"use client"; // Ensure this runs on the client side

import { Card } from '@/components/Card';
import {
  DonutChart,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels
} from '@tremor/react';


const Donut = ({ summary }: { summary: any[] }) => {
  const formatNumber = (number: number) =>
    `${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short",
    }).format(number)}W`;


  return (
    <Card className="overflow-hidden p-0 sm:mx-auto sm:max-w-lg">
      <div className="px-6 pt-6">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Asset allocation
        </h3>
        <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </p>
      </div>
      <TabGroup>
        <TabList className="px-6 pt-4">
          {summary.map((category) => (
            <Tab key={category.name}>By {category.name}</Tab>
          ))}
        </TabList>
        <TabPanels className="mt-8">
          {summary.map((category) => (
            <TabPanel key={category.name}>
              <div className="px-6 pb-6">
                <DonutChart
                  data={category.data}
                  category="amount"
                  index="name"
                  valueFormatter={(num) => formatNumber(num)} // ✅ Pass inline function
                  showTooltip={false}
                  colors={['blue', 'indigo', 'cyan', 'purple', 'fuchsia']}
                />
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </Card>
  );
}
export default Donut;

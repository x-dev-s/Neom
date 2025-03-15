"use client"; // Ensure this runs on the client side

import { BarChart } from "@/components/Barchart";
import { Card } from "@/components/Card";
import {
  List,
  ListItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react';


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;
const statusColor = {
  Successful: 'bg-blue-500',
  Refunded: 'bg-violet-500',
  Fraud: 'bg-fuchsia-500',
};

  const OpChart = ({ summary }: { summary: any[] }) => {
    return (
      <Card className="sm:mx-auto sm:max-w-lg">
          <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Online payments
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
              {summary.map((region) => (
                <TabPanel key={region.name}>
                  <BarChart
                    data={region.data}
                    index="date"
                    categories={['Successful', 'Refunded', 'Early fraud warning']}
                    colors={['blue', 'violet', 'cyan']}
                    valueFormatter={valueFormatter}
                    // stack={true}
                    showLegend={false}
                    showYAxis={false}
                    startEndOnly={true}
                    className="mt-8 h-48"
                  />
                  <List className="mt-2">
                    {region.details.map((item: { name: string; value: number }) => (
                      <ListItem key={item.name}>
                        <div className="flex items-center space-x-2">
                          <span
                            className={classNames(
                              statusColor[item.name as keyof typeof statusColor] || '',
                              'h-0.5 w-3',
                            )}
                            aria-hidden={true}
                          />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          {valueFormatter(item.value)}
                        </span>
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </Card>
    );
  };
export default OpChart;

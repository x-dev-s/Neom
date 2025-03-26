
import DailyYieldBar_PV from "./DailyYieldBar_PV"
import CurtailmentBar_PV from "./CurtailmentBar_PV";
import PowerTrend_PV from "./PowerTrend_PV";
import ActivePowerDoughnut_Inverters from "./ActivePowerDoughnut_Inverters";
import PerformanceKpi from "./PerformanceKpi";

export default function PV() {
  return (
    <div className="flex justify-stretch p-4 items-stretch min-h-[calc(100svh-64px)]">
      <div className="flex items-stretch justify-stretch grow w-full max-w-screen-2xl overflow-hidden">
        {/* Flex Layout */}
        <div className="flex grow items-stretch justify-stretch flex-wrap w-full gap-3 lg:flex-nowrap">
          {/* Left Section - 65% */}
          <div className="flex grow flex-col w-full gap-3">
            {/* First Row - Two Columns */}
            <div className="flex flex-wrap h-full w-full gap-3 lg:flex-nowrap">
              {/* <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center lg:h-full lg:w-1/2 overflow-hidden">
                <DailyYieldBar_PV />
              </div> */}
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center lg:h-full overflow-hidden">
                <CurtailmentBar_PV />
              </div>
            </div>

            {/* Second Row - Two Columns (35% - 65%) */}
            <div className="flex flex-wrap h-full w-full gap-3 lg:flex-nowrap">
              <div className="flex bg-white justify-center rounded-2xl w-full dark:bg-gray-950 items-center lg:w-[35%] overflow-hidden">
                <ActivePowerDoughnut_Inverters />
              </div>
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center lg:h-full lg:w-[65%] overflow-hidden">
                <PowerTrend_PV />
              </div>
            </div>

            {/* Third Row - Three Columns */}
            <div className="flex flex-col gap-3">
              <PerformanceKpi />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
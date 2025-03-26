
import DailyYieldBar_Genset from "./DailyYieldBar_Genset"
import PowerTrend_Genset from "./PowerTrend_Genset";
import ActivePowerDoughnut_Generators from "./ActivePowerDoughnut_Generators";
import OutputKpi from "./OutputKpi";

export default function Genset() {
  return (
    <div className="flex justify-stretch p-4 items-stretch min-h-[calc(100svh-64px)]">
      <div className="flex items-stretch justify-stretch grow w-full max-w-screen-2xl overflow-hidden">
        {/* Flex Layout */}
        <div className="flex grow items-stretch justify-stretch flex-wrap w-full gap-3 lg:flex-nowrap">
          {/* Left Section - 65% */}
          <div className="flex grow flex-col w-full gap-3">
            {/* First Row - Two Columns */}
            <div className="flex flex-wrap h-full w-full gap-3 lg:flex-nowrap">
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center lg:h-full overflow-hidden">
                <DailyYieldBar_Genset />
              </div>
              {/* <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center lg:h-full overflow-hidden">
                <CurtailmentBar_Genset />
              </div> */}
            </div>

            {/* Second Row - Two Columns (35% - 65%) */}
            <div className="flex flex-wrap h-full w-full gap-3 lg:flex-nowrap">
              <div className="flex bg-white justify-center rounded-2xl w-full dark:bg-gray-950 items-center lg:w-[35%] overflow-hidden">
                <ActivePowerDoughnut_Generators />
              </div>
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center lg:h-full lg:w-[65%] overflow-hidden">
                <PowerTrend_Genset />
              </div>
            </div>

            {/* Third Row - Three Columns */}
            <div className="flex flex-col gap-3">
              <OutputKpi />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
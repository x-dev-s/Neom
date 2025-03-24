import DailyYieldBar_SingleInverter from "../DailyYieldBar_SingleInverter";
import CurtailmentBar_SingleInverter from "../CurtailmentBar_SingleInverter";
import PowerTrend_SingleInverter from "../PowerTrend_SingleInverter";
import DataTable from "./DataTable";
import OperationStatus from "./OperationStatus";

export default function Inverter1() {
  return (
    <div className="flex justify-stretch p-4 items-stretch min-h-[calc(100svh-64px)]">
      <div className="flex items-stretch justify-stretch grow w-full max-w-screen-2xl overflow-hidden">
        {/* Flex Layout */}
        <div className="flex grow items-stretch justify-stretch flex-wrap w-full gap-3 lg:flex-nowrap">
          {/* Left Section - 65% */}
          <div className="flex grow flex-col w-full gap-3">
            {/* First Row - Two Columns */}
            <div className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full md:w-1/2 overflow-hidden">
                <DailyYieldBar_SingleInverter id={1} />
              </div>
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full md:w-1/2 overflow-hidden">
                <CurtailmentBar_SingleInverter id={1} />
              </div>
            </div>

            {/* Second Row - Two Columns (35% - 65%) */}
            <div className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full overflow-hidden">
                <PowerTrend_SingleInverter id={1} />
              </div>
            </div>

            {/* Third Row - Three Columns */}
            <div className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full overflow-hidden">
                <OperationStatus />
              </div>
            </div>

            {/* Fourth Row - Three Columns */}
            <div className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
              <div className="flex flex-col bg-white justify-center rounded-2xl w-full dark:bg-gray-950 items-center overflow-hidden">
                <DataTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

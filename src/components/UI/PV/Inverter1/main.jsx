import DailyYieldBar_SingleInverter from "../DailyYieldBar_SingleInverter";
import CurtailmentBar from "./CurtailmentBar";
import PowerTrend from "./PowerTrend";
import DataTable from "./DataTable";
import OperationStatus from "./OperationStatus";

export default function Inverter1() {
  return (
    <div className="flex justify-center p-4 items-center min-h-dvw">
      <div className="h-full w-full max-w-screen-2xl overflow-hidden">
        {/* Flex Layout */}
        <div className="flex flex-wrap w-full gap-3 lg:flex-nowrap">
          <div className="flex flex-col w-full gap-3">
            {/* First Row - Two Columns */}
            <div className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full md:w-1/2 overflow-hidden">
                <DailyYieldBar_SingleInverter id={1} />
              </div>
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full md:w-1/2 overflow-hidden">
                <CurtailmentBar />
              </div>
            </div>

            {/* Second Row - Two Columns (35% - 65%) */}
            <div className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full overflow-hidden">
                <PowerTrend />
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

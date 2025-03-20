
import DailyYieldBar from "./DailyYieldBar";
import CurtailmentBar from "./CurtailmentBar";
import PowerTrend from "./PowerTrend";
import TotalYieldDoughnut from "./TotalYieldDoughnut";
import MeteoKpi from "./MeteoKpi";

export default function Dashboard() {
  return (
    <div className="flex justify-center p-4 items-center min-h-dvw">
      <div className="h-full w-full max-w-7xl overflow-hidden">
        {/* Flex Layout */}
        <div className="flex flex-wrap w-full gap-3 lg:flex-nowrap">
          {/* Left Section - 65% */}
          <div className="flex flex-col w-full gap-3">
            {/* First Row - Two Columns */}
            <div className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full md:w-1/2 overflow-hidden">
                <DailyYieldBar />
              </div>
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full md:w-1/2 overflow-hidden">
                <CurtailmentBar />
              </div>
            </div>

            {/* Second Row - Two Columns (35% - 65%) */}
            <div className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
              <div className="flex bg-white justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:w-[40%] overflow-hidden">
                <TotalYieldDoughnut />
              </div>
              <div className="flex bg-white h-auto justify-center rounded-2xl w-full dark:bg-gray-950 items-center md:h-full md:w-[60%] overflow-hidden">
                <PowerTrend />
              </div>
            </div>

            {/* Third Row - Three Columns */}
            <div className="flex flex-wrap h-full w-full gap-3 md:flex-nowrap">
              <MeteoKpi />
            </div>
          </div>

          {/* Right Section - 35% */}
          {/* <div className="flex flex-col flex-wrap w-dvw gap-3 items-center lg:flex-col lg:w-[35%] md:flex-nowrap md:flex-row">
            <div className="flex bg-white h-[500px] justify-center rounded-2xl w-full items-center lg:w-full md:w-1/2 overflow-hidden">
              <div className="flex h-full justify-center p-4 w-full items-center relative">
                          <div id="bus" className="bg-[#0DC61C] h-[450px] w-1"></div>
                          <Card className={"absolute top-3 left-3"} inverted={true} left={true} imgSrc="/images/solar.png" P={0} Q={50} O={80} />
                          <Card className={"absolute bottom-3 left-3"} inverted={false} left={true} imgSrc="/images/building.png" P={100} Q={50} O={80} />
                          <Card className={"absolute top-3 right-3"} inverted={false} left={false} imgSrc="/images/generator.png" P={100} Q={50} O={80} />
                          <Card className={"absolute top-[36%] right-3"} inverted={false} left={false} imgSrc="/images/generator.png" P={100} Q={50} O={80} />
                          <Card className={"absolute bottom-3 right-3"} inverted={false} left={false} imgSrc="/images/generator.png" P={100} Q={50} O={80} />
                      </div>
            </div>
            <div className="flex bg-white justify-center rounded-2xl w-full items-center lg:w-full md:w-1/2 min-h-96 overflow-hidden">
              <StockTracker data={Ldata} summary={Lsummary} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function Card({ imgSrc, inverted, left, className, P, Q, O }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {(P > 0 && !left) &&
        <div className="h-1 w-[104px] -mr-3 mt-12">
          <div className={inverted ? "dashed-line-inverted" : "dashed-line"}></div>
        </div>
      }
      <div className="flex flex-col justify-center items-center">
        {/* <div className="flex flex-col bg-gray-200 justify-center p-2 rounded-2xl shadow-2xl w-full items-center mb-4">
          <div className="flex justify-around text-sm w-full items-center">
              <p className="text-left w-5">P</p>
              <p className="text-center font-semibold">{P}</p>
              <p className="text-right w-10">kW</p>
          </div>
          <div className="flex justify-around text-sm w-full items-center">
              <p className="text-left w-5">Q</p>
              <p className="text-center font-semibold">{Q}</p>
              <p className="text-right w-10">kVAr</p>
          </div>
          <div className="flex justify-around text-sm w-full items-center">
              <p className="text-left w-5">O</p>
              <p className="text-center font-semibold">{O}</p>
              <p className="text-right w-10">%</p>
          </div>
      </div> */}
        <div className="flex bg-gray-200 justify-around p-2 rounded-2xl shadow-lg gap-3 items-center mb-4">
          <p className="text-left font-semibold">{P}</p>
          <p className="text-right w-10">kW</p>
        </div>
        <img src={imgSrc} alt="Card Image" className="h-20 w-20 object-contain" />
      </div>
      {(P > 0 && left) &&
        <div className="h-1 w-[104px] -ml-3 mt-12">
          <div className={inverted ? "dashed-line-inverted" : "dashed-line"}></div>
        </div>
      }
    </div>
  );
}
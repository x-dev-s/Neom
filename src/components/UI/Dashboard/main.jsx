
import DailyYieldBar from "./DailyYieldBar";
// import OpChart from "./OpChart";
import CurtailmentBar from "./CurtailmentBar";
import PowerTrend from "./PowerTrend";
import Kpi1 from "./kpi1";
import TrackerComponent from "./tracker";
import StockTracker from './StockTracker';

const Tdata = [
  { tooltip: '23 Sep, 2023', status: 'Operational', }, { tooltip: '24 Sep, 2023', status: 'Operational', }, { tooltip: '25 Sep, 2023', status: 'Operational', }, { tooltip: '26 Sep, 2023', status: 'Operational', }, { tooltip: '27 Sep, 2023', status: 'Operational', }, { tooltip: '28 Sep, 2023', status: 'Operational', }, { tooltip: '29 Sep, 2023', status: 'Downtime', }, { tooltip: '30 Sep, 2023', status: 'Operational', }, { tooltip: '1 Oct, 2023', status: 'Operational', }, { tooltip: '2 Oct, 2023', status: 'Operational', }, { tooltip: '3 Oct, 2023', status: 'Operational', }, { tooltip: '4 Oct, 2023', status: 'Operational', }, { tooltip: '5 Oct, 2023', status: 'Operational', }, { tooltip: '6 Oct, 2023', status: 'Operational', }, { tooltip: '7 Oct, 2023', status: 'Operational', }, { tooltip: '8 Oct, 2023', status: 'Operational', }, { tooltip: '9 Oct, 2023', status: 'Operational', }, { tooltip: '10 Oct, 2023', status: 'Operational', }, { tooltip: '11 Oct, 2023', status: 'Operational', }, { tooltip: '12 Oct, 2023', status: 'Operational', }, { tooltip: '13 Oct, 2023', status: 'Operational', }, { tooltip: '14 Oct, 2023', status: 'Operational', }, { tooltip: '15 Oct, 2023', status: 'Operational', }, { tooltip: '16 Oct, 2023', status: 'Operational', }, { tooltip: '17 Oct, 2023', status: 'Operational', }, { tooltip: '18 Oct, 2023', status: 'Operational', }, { tooltip: '19 Oct, 2023', status: 'Operational', }, { tooltip: '20 Oct, 2023', status: 'Operational', }, { tooltip: '21 Oct, 2023', status: 'Downtime', }, { tooltip: '22 Oct, 2023', status: 'Operational', }, { tooltip: '23 Oct, 2023', status: 'Operational', }, { tooltip: '24 Oct, 2023', status: 'Operational', }, { tooltip: '25 Oct, 2023', status: 'Operational', }, { tooltip: '26 Oct, 2023', status: 'Operational', }, { tooltip: '27 Oct, 2023', status: 'Operational', }, { tooltip: '28 Oct, 2023', status: 'Operational', }, { tooltip: '29 Oct, 2023', status: 'Operational', }, { tooltip: '30 Oct, 2023', status: 'Operational', }, { tooltip: '31 Oct, 2023', status: 'Operational', }, { tooltip: '1 Nov, 2023', status: 'Operational', }, { tooltip: '2 Nov, 2023', status: 'Operational', }, { tooltip: '3 Nov, 2023', status: 'Operational', }, { tooltip: '4 Nov, 2023', status: 'Operational', }, { tooltip: '5 Nov, 2023', status: 'Operational', }, { tooltip: '6 Nov, 2023', status: 'Operational', }, { tooltip: '7 Nov, 2023', status: 'Operational', }, { tooltip: '8 Nov, 2023', status: 'Operational', }, { tooltip: '9 Nov, 2023', status: 'Operational', }, { tooltip: '10 Nov, 2023', status: 'Operational', }, { tooltip: '11 Nov, 2023', status: 'Operational', }, { tooltip: '12 Nov, 2023', status: 'Operational', }, { tooltip: '13 Nov, 2023', status: 'Operational', }, { tooltip: '14 Nov, 2023', status: 'Operational', }, { tooltip: '15 Nov, 2023', status: 'Operational', }, { tooltip: '16 Nov, 2023', status: 'Operational', }, { tooltip: '17 Nov, 2023', status: 'Operational', }, { tooltip: '18 Nov, 2023', status: 'Operational', }, { tooltip: '19 Nov, 2023', status: 'Operational', }, { tooltip: '20 Nov, 2023', status: 'Operational', }, { tooltip: '21 Nov, 2023', status: 'Operational', }, { tooltip: '22 Nov, 2023', status: 'Operational', }, { tooltip: '23 Nov, 2023', status: 'Operational', }, { tooltip: '24 Nov, 2023', status: 'Downtime', }, { tooltip: '25 Nov, 2023', status: 'Operational', }, { tooltip: '26 Nov, 2023', status: 'Operational', }, { tooltip: '27 Nov, 2023', status: 'Operational', }, { tooltip: '28 Nov, 2023', status: 'Operational', }, { tooltip: '29 Nov, 2023', status: 'Operational', }, { tooltip: '30 Nov, 2023', status: 'Operational', }, { tooltip: '1 Dec, 2023', status: 'Operational', }, { tooltip: '2 Dec, 2023', status: 'Operational', }, { tooltip: '3 Dec, 2023', status: 'Operational', }, { tooltip: '4 Dec, 2023', status: 'Operational', }, { tooltip: '5 Dec, 2023', status: 'Operational', }, { tooltip: '6 Dec, 2023', status: 'Operational', }, { tooltip: '7 Dec, 2023', status: 'Operational', }, { tooltip: '8 Dec, 2023', status: 'Operational', }, { tooltip: '9 Dec, 2023', status: 'Operational', }, { tooltip: '10 Dec, 2023', status: 'Operational', }, { tooltip: '11 Dec, 2023', status: 'Operational', }, { tooltip: '12 Dec, 2023', status: 'Operational', }, { tooltip: '13 Dec, 2023', status: 'Operational', }, { tooltip: '14 Dec, 2023', status: 'Operational', }, { tooltip: '15 Dec, 2023', status: 'Operational', }, { tooltip: '16 Dec, 2023', status: 'Operational', }, { tooltip: '17 Dec, 2023', status: 'Operational', }, { tooltip: '18 Dec, 2023', status: 'Operational', }, { tooltip: '19 Dec, 2023', status: 'Operational', }, { tooltip: '20 Dec, 2023', status: 'Operational', }, { tooltip: '21 Dec, 2023', status: 'Operational', }, { tooltip: '22 Dec, 2023', status: 'Operational', }, { tooltip: '23 Dec, 2023', status: 'Operational', }, { tooltip: '24 Dec, 2023', status: 'Operational', }, { tooltip: '25 Dec, 2023', status: 'Operational', }, { tooltip: '26 Dec, 2023', status: 'Operational', }, { tooltip: '27 Dec, 2023', status: 'Operational', },
];


const Ldata = [
  { date: 'Nov 24, 2023', GOOG: 156.2, AMZN: 68.5, SPOT: 71.8, MSFT: 205.3, TSLA: 1050.6, }, { date: 'Nov 25, 2023', GOOG: 152.5, AMZN: 69.3, SPOT: 67.2, MSFT: 223.1, TSLA: 945.8, }, { date: 'Nov 26, 2023', GOOG: 148.7, AMZN: 69.8, SPOT: 61.5, MSFT: 240.9, TSLA: 839.4, }, { date: 'Nov 27, 2023', GOOG: 155.3, AMZN: 73.5, SPOT: 57.9, MSFT: 254.7, TSLA: 830.2, }, { date: 'Nov 28, 2023', GOOG: 160.1, AMZN: 75.2, SPOT: 59.6, MSFT: 308.5, TSLA: 845.7, }, { date: 'Nov 29, 2023', GOOG: 175.6, AMZN: 89.2, SPOT: 57.3, MSFT: 341.4, TSLA: 950.2, }, { date: 'Nov 30, 2023', GOOG: 180.2, AMZN: 92.7, SPOT: 59.8, MSFT: 378.1, TSLA: 995.9, }, { date: 'Dec 01, 2023', GOOG: 185.5, AMZN: 95.3, SPOT: 62.4, MSFT: 320.3, TSLA: 1060.4, }, { date: 'Dec 02, 2023', GOOG: 182.3, AMZN: 93.8, SPOT: 60.7, MSFT: 356.5, TSLA: 965.8, }, { date: 'Dec 03, 2023', GOOG: 180.7, AMZN: 91.6, SPOT: 58.9, MSFT: 340.7, TSLA: 970.3, }, { date: 'Dec 04, 2023', GOOG: 178.5, AMZN: 89.7, SPOT: 56.2, MSFT: 365.9, TSLA: 975.9, }, { date: 'Dec 05, 2023', GOOG: 176.2, AMZN: 87.5, SPOT: 54.8, MSFT: 375.1, TSLA: 964.6, }, { date: 'Dec 06, 2023', GOOG: 174.8, AMZN: 85.3, SPOT: 53.4, MSFT: 340.3, TSLA: 960.4, }, { date: 'Dec 07, 2023', GOOG: 178.0, AMZN: 88.2, SPOT: 55.2, MSFT: 335.5, TSLA: 955.3, }, { date: 'Dec 08, 2023', GOOG: 180.6, AMZN: 90.5, SPOT: 56.8, MSFT: 310.7, TSLA: 950.3, }, { date: 'Dec 09, 2023', GOOG: 182.4, AMZN: 92.8, SPOT: 58.4, MSFT: 300.9, TSLA: 845.4, }, { date: 'Dec 10, 2023', GOOG: 179.7, AMZN: 90.2, SPOT: 57.0, MSFT: 290.1, TSLA: 1011.6, }, { date: 'Dec 11, 2023', GOOG: 154.2, AMZN: 88.7, SPOT: 55.6, MSFT: 291.3, TSLA: 1017.9, }, { date: 'Dec 12, 2023', GOOG: 151.9, AMZN: 86.5, SPOT: 53.9, MSFT: 293.5, TSLA: 940.3, }, { date: 'Dec 13, 2023', GOOG: 149.3, AMZN: 83.7, SPOT: 52.1, MSFT: 301.7, TSLA: 900.8, }, { date: 'Dec 14, 2023', GOOG: 148.8, AMZN: 81.4, SPOT: 50.5, MSFT: 321.9, TSLA: 780.4, }, { date: 'Dec 15, 2023', GOOG: 145.5, AMZN: 79.8, SPOT: 48.9, MSFT: 328.1, TSLA: 765.1, }, { date: 'Dec 16, 2023', GOOG: 140.2, AMZN: 84.5, SPOT: 50.2, MSFT: 331.3, TSLA: 745.9, }, { date: 'Dec 17, 2023', GOOG: 143.8, AMZN: 82.1, SPOT: 49.6, MSFT: 373.5, TSLA: 741.8, }, { date: 'Dec 18, 2023', GOOG: 157.5, AMZN: 86.9, SPOT: 51.3, MSFT: 381.7, TSLA: 739.8, },
];

const Lsummary = [
  { ticker: 'AMZN', description: 'Amazon', value: '$86.9', change: '+0.92%', changeType: 'positive', }, { ticker: 'TSLA', description: 'Tesla, Inc.', value: '$739.8', change: '-2.12%', changeType: 'negative', }, { ticker: 'GOOG', description: 'Alphabet, Inc', value: '$157.5', change: '+0.38%', changeType: 'positive', }, { ticker: 'SPOT', description: 'Spotify', value: '$51.3', change: '−0.25%', changeType: 'negative', }, { ticker: 'MSFT', description: 'Microsoft', value: '$381.7', change: '+2.45%', changeType: 'positive', },
];


const dataEurope = [
  { date: 'Jan 23', Successful: 12, Refunded: 0, 'Early fraud warning': 1, }, { date: 'Feb 23', Successful: 24, Refunded: 1, 'Early fraud warning': 1, }, { date: 'Mar 23', Successful: 48, Refunded: 4, 'Early fraud warning': 4, }, { date: 'Apr 23', Successful: 24, Refunded: 2, 'Early fraud warning': 3, }, { date: 'May 23', Successful: 34, Refunded: 0, 'Early fraud warning': 0, }, { date: 'Jun 23', Successful: 26, Refunded: 0, 'Early fraud warning': 0, }, { date: 'Jul 23', Successful: 12, Refunded: 0, 'Early fraud warning': 0, }, { date: 'Aug 23', Successful: 38, Refunded: 2, 'Early fraud warning': 0, }, { date: 'Sep 23', Successful: 23, Refunded: 1, 'Early fraud warning': 0, }, { date: 'Oct 23', Successful: 20, Refunded: 0, 'Early fraud warning': 0, }, { date: 'Nov 23', Successful: 24, Refunded: 0, 'Early fraud warning': 0, }, { date: 'Dec 23', Successful: 21, Refunded: 8, 'Early fraud warning': 1, },
];

const dataNorthAmerica = [
  { date: 'Jan 23', Successful: 65, Refunded: 2, 'Early fraud warning': 1, }, { date: 'Feb 23', Successful: 78, Refunded: 3, 'Early fraud warning': 2, }, { date: 'Mar 23', Successful: 55, Refunded: 5, 'Early fraud warning': 6, }, { date: 'Apr 23', Successful: 79, Refunded: 4, 'Early fraud warning': 3, }, { date: 'May 23', Successful: 41, Refunded: 1, 'Early fraud warning': 1, }, { date: 'Jun 23', Successful: 32, Refunded: 1, 'Early fraud warning': 1, }, { date: 'Jul 23', Successful: 54, Refunded: 0, 'Early fraud warning': 0, }, { date: 'Aug 23', Successful: 45, Refunded: 3, 'Early fraud warning': 1, }, { date: 'Sep 23', Successful: 75, Refunded: 2, 'Early fraud warning': 0, }, { date: 'Oct 23', Successful: 62, Refunded: 1, 'Early fraud warning': 0, }, { date: 'Nov 23', Successful: 55, Refunded: 1, 'Early fraud warning': 0, }, { date: 'Dec 23', Successful: 58, Refunded: 6, 'Early fraud warning': 2, },
];

const dataAsia = [
  { date: 'Jan 23', Successful: 31, Refunded: 1, 'Early fraud warning': 2, }, { date: 'Feb 23', Successful: 32, Refunded: 2, 'Early fraud warning': 1, }, { date: 'Mar 23', Successful: 44, Refunded: 3, 'Early fraud warning': 3, }, { date: 'Apr 23', Successful: 23, Refunded: 2, 'Early fraud warning': 4, }, { date: 'May 23', Successful: 35, Refunded: 1, 'Early fraud warning': 1, }, { date: 'Jun 23', Successful: 48, Refunded: 1, 'Early fraud warning': 1, }, { date: 'Jul 23', Successful: 33, Refunded: 1, 'Early fraud warning': 1, }, { date: 'Aug 23', Successful: 38, Refunded: 3, 'Early fraud warning': 0, }, { date: 'Sep 23', Successful: 41, Refunded: 2, 'Early fraud warning': 0, }, { date: 'Oct 23', Successful: 39, Refunded: 1, 'Early fraud warning': 0, }, { date: 'Nov 23', Successful: 32, Refunded: 1, 'Early fraud warning': 1, }, { date: 'Dec 23', Successful: 19, Refunded: 5, 'Early fraud warning': 1, },
];

const summary = [
  { name: 'Europe', data: dataEurope, details: [{ name: 'Successful', value: 263, }, { name: 'Refunded', value: 18, }, { name: 'Fraud', value: 10, },], }, { name: 'North America', data: dataNorthAmerica, details: [{ name: 'Successful', value: 652, }, { name: 'Refunded', value: 29, }, { name: 'Fraud', value: 17, },], }, { name: 'Asia', data: dataAsia, details: [{ name: 'Successful', value: 405, }, { name: 'Refunded', value: 21, }, { name: 'Fraud', value: 15, },], },
];


const data = [
  {
    date: 'Jan 23',
    'This Year': 68560,
    'Last Year': 28560,
  },
  {
    date: 'Feb 23',
    'This Year': 70320,
    'Last Year': 30320,
  },
  {
    date: 'Mar 23',
    'This Year': 80233,
    'Last Year': 70233,
  },
  {
    date: 'Apr 23',
    'This Year': 55123,
    'Last Year': 45123,
  },
  {
    date: 'May 23',
    'This Year': 56000,
    'Last Year': 80600,
  },
  {
    date: 'Jun 23',
    'This Year': 100000,
    'Last Year': 85390,
  },
  {
    date: 'Jul 23',
    'This Year': 85390,
    'Last Year': 45340,
  },
  {
    date: 'Aug 23',
    'This Year': 80100,
    'Last Year': 70120,
  },
  {
    date: 'Sep 23',
    'This Year': 75090,
    'Last Year': 69450,
  },
  {
    date: 'Oct 23',
    'This Year': 71080,
    'Last Year': 63345,
  },
  {
    date: 'Nov 23',
    'This Year': 61210,
    'Last Year': 100330,
  },
  {
    date: 'Dec 23',
    'This Year': 60143,
    'Last Year': 45321,
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-dvw flex justify-center items-center p-4">
      <div className="w-full h-full max-w-7xl overflow-hidden">
        {/* Flex Layout */}
        <div className="w-full flex flex-wrap lg:flex-nowrap gap-3">
          {/* Left Section - 65% */}
          <div className="w-dvw lg:w-[65%] flex flex-col gap-3">
            {/* First Row - Two Columns */}
            <div className="w-full h-full flex flex-wrap md:flex-nowrap gap-3">
              <div className="w-full h-auto md:h-full md:w-1/2 bg-white overflow-hidden rounded-2xl flex items-center justify-center">
                <DailyYieldBar />
              </div>
              <div className="w-full md:w-1/2 h-auto md:h-full bg-white overflow-hidden rounded-2xl flex items-center justify-center">
                <CurtailmentBar />
              </div>
            </div>

            {/* Second Row - Two Columns (35% - 65%) */}
            <div className="w-full h-full flex flex-wrap md:flex-nowrap gap-3">
              <div className="w-full md:w-[35%] min-h-96 bg-white overflow-hidden rounded-2xl flex items-center justify-center">

              </div>
              <div className="w-full md:w-[65%] h-auto md:h-full  bg-white overflow-hidden rounded-2xl flex items-center justify-center">
                <PowerTrend />
              </div>
            </div>

            {/* Third Row - Three Columns */}
            <div className="w-full h-full flex flex-wrap md:flex-nowrap gap-3">
              <div className="w-full md:w-1/3 min-h-24 h-auto md:h-full bg-white overflow-hidden rounded-2xl flex items-center justify-center">
                {/* <TrackerComponent 
                      title="PV System Status"
                      location="NEOM-1"
                      lastSync="Current Date"
                      status="Operational"
                      data={Tdata}
                      /> */}
              </div>
              <div className="w-full md:w-1/3 min-h-24 h-auto md:h-full  bg-white overflow-hidden rounded-2xl flex items-center justify-center">
                {/* <Kpi1/> */}
              </div>
              <div className="w-full md:w-1/3 min-h-24 h-auto md:h-full  bg-white overflow-hidden rounded-2xl flex items-center justify-center">
                {/* <Kpi1/> */}
              </div>
            </div>
          </div>

          {/* Right Section - 35% */}
          <div className="w-dvw lg:w-[35%] flex flex-wrap md:flex-nowrap flex-col md:flex-row lg:flex-col items-center gap-3">
            <div className="w-full md:w-1/2 lg:w-full h-[500px]  bg-white overflow-hidden rounded-2xl flex items-center justify-center">
              {/* <div className="w-full h-full flex items-center justify-center relative p-4">
                          <div id="bus" className="h-[450px] w-1 bg-[#0DC61C]"></div>
                          <Card className={"absolute top-3 left-3"} inverted={true} left={true} imgSrc="/images/solar.png" P={0} Q={50} O={80} />
                          <Card className={"absolute bottom-3 left-3"} inverted={false} left={true} imgSrc="/images/building.png" P={100} Q={50} O={80} />
                          <Card className={"absolute top-3 right-3"} inverted={false} left={false} imgSrc="/images/generator.png" P={100} Q={50} O={80} />
                          <Card className={"absolute top-[36%] right-3"} inverted={false} left={false} imgSrc="/images/generator.png" P={100} Q={50} O={80} />
                          <Card className={"absolute bottom-3 right-3"} inverted={false} left={false} imgSrc="/images/generator.png" P={100} Q={50} O={80} />
                      </div> */}
            </div>
            <div className="w-full md:w-1/2 lg:w-full min-h-96  bg-white overflow-hidden rounded-2xl flex items-center justify-center">
              {/* <StockTracker data={Ldata} summary={Lsummary} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ imgSrc, inverted, left, className, P, Q, O }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {(P > 0 && !left) &&
        <div className="h-1 w-[104px] mt-12 -mr-3">
          <div className={inverted ? "dashed-line-inverted" : "dashed-line"}></div>
        </div>
      }
      <div className="flex flex-col items-center justify-center">
        {/* <div className="w-full flex flex-col items-center justify-center bg-gray-200 shadow-2xl rounded-2xl mb-4 p-2">
          <div className="flex w-full items-center justify-around text-sm ">
              <p className="text-left w-5">P</p>
              <p className="text-center font-semibold">{P}</p>
              <p className="text-right w-10">kW</p>
          </div>
          <div className="flex w-full items-center justify-around text-sm ">
              <p className="text-left w-5">Q</p>
              <p className="text-center font-semibold">{Q}</p>
              <p className="text-right w-10">kVAr</p>
          </div>
          <div className="flex w-full items-center justify-around text-sm ">
              <p className="text-left w-5">O</p>
              <p className="text-center font-semibold">{O}</p>
              <p className="text-right w-10">%</p>
          </div>
      </div> */}
        <div className="flex items-center justify-around bg-gray-200 shadow-lg rounded-2xl mb-4 gap-3 p-2">
          <p className="text-left font-semibold">{P}</p>
          <p className="text-right w-10">kW</p>
        </div>
        <img src={imgSrc} alt="Card Image" className="w-20 h-20 object-contain" />
      </div>
      {(P > 0 && left) &&
        <div className="h-1 w-[104px] mt-12 -ml-3">
          <div className={inverted ? "dashed-line-inverted" : "dashed-line"}></div>
        </div>
      }
    </div>
  );
}
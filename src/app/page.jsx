import SalesChart from "@/components/UI/Chart1";
import OpChart from "@/components/UI/OpChart";

const dataEurope = [
  {    date: 'Jan 23',    Successful: 12,    Refunded: 0,    'Early fraud warning': 1,  },  {    date: 'Feb 23',    Successful: 24,    Refunded: 1,    'Early fraud warning': 1,  },  {    date: 'Mar 23',    Successful: 48,    Refunded: 4,    'Early fraud warning': 4,  },  {    date: 'Apr 23',    Successful: 24,    Refunded: 2,    'Early fraud warning': 3,  },  {    date: 'May 23',    Successful: 34,    Refunded: 0,    'Early fraud warning': 0,  },  {    date: 'Jun 23',    Successful: 26,    Refunded: 0,    'Early fraud warning': 0,  },  {    date: 'Jul 23',    Successful: 12,    Refunded: 0,    'Early fraud warning': 0,  },  {    date: 'Aug 23',    Successful: 38,    Refunded: 2,    'Early fraud warning': 0,  },  {    date: 'Sep 23',    Successful: 23,    Refunded: 1,    'Early fraud warning': 0,  },  {    date: 'Oct 23',    Successful: 20,    Refunded: 0,    'Early fraud warning': 0,  },  {    date: 'Nov 23',    Successful: 24,    Refunded: 0,    'Early fraud warning': 0,  },  {    date: 'Dec 23',    Successful: 21,    Refunded: 8,    'Early fraud warning': 1,  },
];

const dataNorthAmerica = [
  {    date: 'Jan 23',    Successful: 65,    Refunded: 2,    'Early fraud warning': 1,  },  {    date: 'Feb 23',    Successful: 78,    Refunded: 3,    'Early fraud warning': 2,  },  {    date: 'Mar 23',    Successful: 55,    Refunded: 5,    'Early fraud warning': 6,  },  {    date: 'Apr 23',    Successful: 79,    Refunded: 4,    'Early fraud warning': 3,  },  {    date: 'May 23',    Successful: 41,    Refunded: 1,    'Early fraud warning': 1,  },  {    date: 'Jun 23',    Successful: 32,    Refunded: 1,    'Early fraud warning': 1,  },  {    date: 'Jul 23',    Successful: 54,    Refunded: 0,    'Early fraud warning': 0,  },  {    date: 'Aug 23',    Successful: 45,    Refunded: 3,    'Early fraud warning': 1,  },  {    date: 'Sep 23',    Successful: 75,    Refunded: 2,    'Early fraud warning': 0,  },  {    date: 'Oct 23',    Successful: 62,    Refunded: 1,    'Early fraud warning': 0,  },  {    date: 'Nov 23',    Successful: 55,    Refunded: 1,    'Early fraud warning': 0,  },  {    date: 'Dec 23',    Successful: 58,    Refunded: 6,    'Early fraud warning': 2,  },
];

const dataAsia = [
  {    date: 'Jan 23',    Successful: 31,    Refunded: 1,    'Early fraud warning': 2,  },  {    date: 'Feb 23',    Successful: 32,    Refunded: 2,    'Early fraud warning': 1,  },  {    date: 'Mar 23',    Successful: 44,    Refunded: 3,    'Early fraud warning': 3,  },  {    date: 'Apr 23',    Successful: 23,    Refunded: 2,    'Early fraud warning': 4,  },  {    date: 'May 23',    Successful: 35,    Refunded: 1,    'Early fraud warning': 1,  },  {    date: 'Jun 23',    Successful: 48,    Refunded: 1,    'Early fraud warning': 1,  },  {    date: 'Jul 23',    Successful: 33,    Refunded: 1,    'Early fraud warning': 1,  },  {    date: 'Aug 23',    Successful: 38,    Refunded: 3,    'Early fraud warning': 0,  },  {    date: 'Sep 23',    Successful: 41,    Refunded: 2,    'Early fraud warning': 0,  },  {    date: 'Oct 23',    Successful: 39,    Refunded: 1,    'Early fraud warning': 0,  },  {    date: 'Nov 23',    Successful: 32,    Refunded: 1,    'Early fraud warning': 1,  },  {    date: 'Dec 23',    Successful: 19,    Refunded: 5,    'Early fraud warning': 1,  },
];

const summary = [
  {    name: 'Europe',    data: dataEurope,    details: [      {        name: 'Successful',        value: 263,      },      {        name: 'Refunded',        value: 18,      },      {        name: 'Fraud',        value: 10,      },    ],  },  {    name: 'North America',    data: dataNorthAmerica,    details: [      {        name: 'Successful',        value: 652,      },      {        name: 'Refunded',        value: 29,      },      {        name: 'Fraud',        value: 17,      },    ],  },  {    name: 'Asia',    data: dataAsia,    details: [      {        name: 'Successful',        value: 405,      },      {        name: 'Refunded',        value: 21,      },      {        name: 'Fraud',        value: 15,      },    ],  },
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
        <div className="min-h-dvw bg-[#E8F3FC] flex justify-center items-center p-4">
            <div className="w-full h-full max-w-7xl overflow-hidden">
                {/* Flex Layout */}
                <div className="w-full flex flex-wrap lg:flex-nowrap gap-3">
                    {/* Left Section - 65% */}
                    <div className="w-dvw lg:w-[65%] flex flex-col gap-3">
                        {/* First Row - Two Columns */}
                        <div className="w-full h-full flex flex-wrap md:flex-nowrap gap-3">
                            <div className="w-full h-full md:w-1/2 bg-white rounded-2xl flex items-center justify-center">
                                <SalesChart data={data} />
                            </div>
                            <div className="w-full md:w-1/2 bg-white rounded-2xl flex items-center justify-center">
                                <OpChart summary={summary} />
                            </div>
                        </div>

                        {/* Second Row - Two Columns (35% - 65%) */}
                        <div className="w-full h-full flex flex-wrap md:flex-nowrap gap-3">
                            <div className="w-full md:w-[35%] min-h-96 bg-white rounded-2xl flex items-center justify-center"></div>
                            <div className="w-full md:w-[65%] min-h-96 bg-white rounded-2xl flex items-center justify-center"></div>
                        </div>

                        {/* Third Row - Three Columns */}
                        <div className="w-full h-full flex flex-wrap md:flex-nowrap gap-3">
                            <div className="w-full md:w-1/3 min-h-72 bg-white rounded-2xl flex items-center justify-center"></div>
                            <div className="w-full md:w-1/3 min-h-72 bg-white rounded-2xl flex items-center justify-center"></div>
                            <div className="w-full md:w-1/3 min-h-72 bg-white rounded-2xl flex items-center justify-center"></div>
                        </div>
                    </div>

                    {/* Right Section - 35% */}
                    <div className="w-dvw lg:w-[35%] flex flex-wrap md:flex-nowrap flex-col md:flex-row lg:flex-col items-center gap-3">
                        <div className="w-full md:w-1/2 lg:w-full h-[500px] bg-white rounded-2xl flex items-center justify-center">
                            <div className="w-full h-full flex items-center justify-center relative p-4">
                                <div id="bus" className="h-[450px] w-1 bg-[#0DC61C]"></div>
                                <Card className={"absolute top-3 left-3"} inverted={true} left={true} imgSrc="/images/solar.png" P={0} Q={50} O={80} />
                                <Card className={"absolute bottom-3 left-3"} inverted={false} left={true} imgSrc="/images/building.png" P={100} Q={50} O={80} />
                                <Card className={"absolute top-3 right-3"} inverted={false} left={false} imgSrc="/images/generator.png" P={100} Q={50} O={80} />
                                <Card className={"absolute top-[36%] right-3"} inverted={false} left={false} imgSrc="/images/generator.png" P={100} Q={50} O={80} />
                                <Card className={"absolute bottom-3 right-3"} inverted={false} left={false} imgSrc="/images/generator.png" P={100} Q={50} O={80} />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-full min-h-96 bg-white rounded-2xl flex items-center justify-center"></div>
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
                <div className="flex items-center justify-around bg-gray-200 shadow-lg rounded-2xl mb-4 p-2">
                    <p className="text-left font-semibold w-12">{P}</p>
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

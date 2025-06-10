import CurtailmentTrend from "./CurtailmentTrend"

export default function Curtailment() {
  return (
    <div className="flex justify-stretch p-4 items-stretch min-h-[calc(100svh-64px)]">
      <div className="flex items-stretch justify-stretch grow w-full max-w-screen-2xl overflow-hidden">
        {/* Flex Layout */}
        <div className="flex grow items-stretch justify-stretch flex-wrap w-full gap-3 lg:flex-nowrap">
          {/* Left Section - 65% */}
          <div className="flex grow flex-col items-center justify-center w-full gap-3">
            <CurtailmentTrend />
          </div>
        </div>
      </div>
    </div>
  );
}
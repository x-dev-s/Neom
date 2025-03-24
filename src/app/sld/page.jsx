import SLD from "../../components/UI/SLD/main";
export const metadata = {
  title: "SLD - " + process.env.WEBSITE_NAME,
  openGraph: {
    title: "SLD - " + process.env.WEBSITE_NAME,
  },
  twitter: {
    title: "SLD - " + process.env.WEBSITE_NAME,
  },
};
export default function SLDPage() {
  return (
    <div className="flex justify-stretch p-4 items-stretch w-full h-full min-h-[calc(100svh-64px)]">
      <div className="flex items-center justify-center w-full grow min-h-[calc(100svh-112px)] bg-white p-6 dark:bg-gray-950 text-black dark:text-gray-200 rounded-2xl">
        <SLD />
      </div>
    </div>
  );
}

import Curtailment from "@/components/UI/Curtailment/main";

export const metadata = {
  title: "PV Curtailment - " + process.env.WEBSITE_NAME,
  openGraph: {
    title: "PV Curtailment - " + process.env.WEBSITE_NAME,
  },
  twitter: {
    title: "PV Curtailment - " + process.env.WEBSITE_NAME,
  },
};
export default function CurtailmentPage() {
  return <Curtailment />;
}

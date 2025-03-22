import Inverter1 from "@/components/UI/PV/Inverter1/main";
export const metadata = {
    title: "Inverter 1 - " + process.env.WEBSITE_NAME,
    openGraph: {
        title: "Inverter 1 - " + process.env.WEBSITE_NAME,
    },
    twitter: {
        title: "Inverter 1 - " + process.env.WEBSITE_NAME,
    },
};
export default function Inverter1Page(){
    return <Inverter1 />;
}
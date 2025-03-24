import Inverter2 from "@/components/UI/PV/Inverter2/main";
export const metadata = {
    title: "Inverter 2 - " + process.env.WEBSITE_NAME,
    openGraph: {
        title: "Inverter 2 - " + process.env.WEBSITE_NAME,
    },
    twitter: {
        title: "Inverter 2 - " + process.env.WEBSITE_NAME,
    },
};
export default function Inverter2Page(){
    return <Inverter2 />;
}
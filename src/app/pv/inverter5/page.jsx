import Inverter5 from "../../../components/UI/PV/Inverter5/main";
export const metadata = {
    title: "Inverter 5 - " + process.env.WEBSITE_NAME,
    openGraph: {
        title: "Inverter 5 - " + process.env.WEBSITE_NAME,
    },
    twitter: {
        title: "Inverter 5 - " + process.env.WEBSITE_NAME,
    },
};
export default function Inverter5Page(){
    return <Inverter5 />;
}
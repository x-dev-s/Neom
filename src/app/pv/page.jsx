import Inverter6 from "../../components/UI/PV/Inverter6/main";
export const metadata = {
    title: "PV - " + process.env.WEBSITE_NAME,
    openGraph: {
        title: "PV - " + process.env.WEBSITE_NAME,
    },
    twitter: {
        title: "PV - " + process.env.WEBSITE_NAME,
    },
};
export default function PvPage(){
    return <Inverter6 />
}
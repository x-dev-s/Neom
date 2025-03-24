import Inverter4 from "../../../components/UI/PV/Inverter4/main";
export const metadata = {
    title: "Inverter 4 - " + process.env.WEBSITE_NAME,
    openGraph: {
        title: "Inverter 4 - " + process.env.WEBSITE_NAME,
    },
    twitter: {
        title: "Inverter 4 - " + process.env.WEBSITE_NAME,
    },
};
export default function Inverter4Page(){
    return <Inverter4 />;
}
import Inverter3 from "../../../components/UI/PV/Inverter3/main";
export const metadata = {
    title: "Inverter 3 - " + process.env.WEBSITE_NAME,
    openGraph: {
        title: "Inverter 3 - " + process.env.WEBSITE_NAME,
    },
    twitter: {
        title: "Inverter 3 - " + process.env.WEBSITE_NAME,
    },
};
export default function Inverter3Page(){
    return <Inverter3 />;
}
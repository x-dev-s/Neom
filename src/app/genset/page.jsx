import Genset from "@/components/UI/Genset/main";
export const metadata = {
    title: "Genset - " + process.env.WEBSITE_NAME,
    openGraph: {
        title: "Genset - " + process.env.WEBSITE_NAME,
    },
    twitter: {
        title: "Genset - " + process.env.WEBSITE_NAME,
    },
};
export default function GensetPage(){
    return <Genset />
}
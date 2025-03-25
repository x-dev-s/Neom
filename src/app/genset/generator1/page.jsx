import Generator1 from "@/components/UI/Genset/Generator1/main";
export const metadata = {
    title: "Generator 1 - " + process.env.WEBSITE_NAME,
    openGraph: {
        title: "Generator 1 - " + process.env.WEBSITE_NAME,
    },
    twitter: {
        title: "Generator 1 - " + process.env.WEBSITE_NAME,
    },
};
export default function Generator1Page() {
    return <Generator1 />;
}
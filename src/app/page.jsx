
import Dashboard from "@/components/UI/Dashboard/main";

export const metadata = {
    title: "Dashboard - " + process.env.WEBSITE_NAME,
    openGraph: {
        title: "Dashboard - " + process.env.WEBSITE_NAME,
    },
    twitter: {
        title: "Dashboard - " + process.env.WEBSITE_NAME,
    },
};

export default function DashboardPage() {
    return <Dashboard />;
}
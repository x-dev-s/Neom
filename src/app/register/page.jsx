import Register from '@/components/UI/Register/main';

export const metadata = {
    title: "Login - " + process.env.WEBSITE_NAME,
    description: "Login to access the web portal for live monitoring of 937kWp PV Diesel Hybrid System",
    image: "/images/logo.png",
    openGraph: {
        title: "Login - " + process.env.WEBSITE_NAME,
        description: "Login to access the web portal for live monitoring of 937kWp PV Diesel Hybrid System",
        image: "/images/logo.png",
    },
    twitter: {
        title: "Login - " + process.env.WEBSITE_NAME,
        description: "Login to access the web portal for live monitoring of 937kWp PV Diesel Hybrid System",
        image: "/images/logo.png",
    },
};

export default function LoginPage() {
    return <Register />;
}
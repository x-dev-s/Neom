import Register from '@/components/UI/Register/main';

export const metadata = {
    title: "Register - " + process.env.WEBSITE_NAME,
    description: "Register to access the web portal for live monitoring of 937kWp PV Diesel Hybrid System",
    image: "/images/logo.png",
    openGraph: {
        title: "Register - " + process.env.WEBSITE_NAME,
        description: "Register to access the web portal for live monitoring of 937kWp PV Diesel Hybrid System",
        image: "/images/logo.png",
    },
    twitter: {
        title: "Register - " + process.env.WEBSITE_NAME,
        description: "Register to access the web portal for live monitoring of 937kWp PV Diesel Hybrid System",
        image: "/images/logo.png",
    },
};

export default function RegisterPage() {
    return <Register />;
}
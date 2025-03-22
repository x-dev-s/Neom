import { ThemeProvider } from "next-themes";
import { Inter, Archivo_Black, Anton } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/Sidebar";
import AppSidebar from "@/components/UI/Navigation/AppSidebar";
import Breadcrumbs from "@/components/UI/Navigation/Breadcrumbs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 150; // revalidate at most every hour

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-text",
});

const mono = Archivo_Black({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-heading",
});

const serif = Anton({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-serif",
});

export const metadata = {
  metadataBase: new URL(`${process.env.WEBSITE_URL}`),
  title: process.env.WEBSITE_NAME,
  description: process.env.WEBSITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${process.env.WEBSITE_URL}`,
    title: process.env.WEBSITE_NAME,
    description: process.env.WEBSITE_DESCRIPTION,
    images: [
      {
        url: `${process.env.WEBSITE_URL}/images/logo.png`,
        alt: process.env.WEBSITE_NAME,
        width: 800,
        height: 600,
        type: "image/png",
      },
    ],
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${mono.variable} ${serif.variable} font-sans overflow-y-scroll flex flex-col items-center justify-center min-h-dvh scroll-auto bg-blue-50 antialiased text-sm selection:bg-indigo-100 selection:text-indigo-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <div className="m-auto text-black w-full dark:text-gray-200 max-w-screen-2xl">
          <ThemeProvider defaultTheme="system" attribute="class" className>
            {/* <div className="flex flex-col h-full justify-stretch w-full items-stretch lg:flex-row"> */}
              <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <div className="w-full">
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950">
                  <SidebarTrigger className="-ml-1" />
                  <div className="mr-2 h-4 w-px bg-gray-200 dark:bg-gray-800" />
                  <Breadcrumbs />
                </header>
                <main className="bg-blue-50 w-full dark:bg-gray-700">
                  {children}
                </main>
                </div>
              </SidebarProvider>
            {/* </div> */}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}

import { ThemeProvider } from "next-themes"
import { Inter, Archivo_Black, Anton } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/UI/Navigation/Sidebar";

export const dynamic = 'force-dynamic';
export const revalidate = 150 // revalidate at most every hour

const sans = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: '--font-text',
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.WEBSITE_URL}`,
    title: process.env.WEBSITE_NAME,
    description: process.env.WEBSITE_DESCRIPTION,
    images: [
      {
        url: `${process.env.WEBSITE_URL}/images/logo.png`,
        alt: process.env.WEBSITE_NAME,
        width: 800,
        height: 600,
        type: 'image/png',
      },
    ],
  },
};
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}) {

  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${mono.variable} ${serif.variable} font-sans overflow-y-scroll flex flex-col items-center justify-center min-h-dvh scroll-auto bg-blue-50 antialiased text-sm selection:bg-indigo-100 selection:text-indigo-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <div className="m-auto text-black w-full dark:text-gray-200 max-w-screen-2xl">
          <ThemeProvider defaultTheme="light" attribute="class" className>
          <div className="flex flex-col h-full justify-stretch w-full items-stretch lg:flex-row">
            <Sidebar />
            <main className="bg-blue-50 w-full dark:bg-gray-700 lg:w-[calc(100%-208px)]">{children}</main>
          </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}

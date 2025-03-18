import { ThemeProvider } from "next-themes"
import { Inter, Archivo_Black, Anton } from "next/font/google"
import "./globals.css"
import { siteConfig } from "@/components/UI/Navigation/siteConfig";
import Sidebar from "@/components/UI/Navigation/Sidebar";

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
        className={`${sans.variable} ${mono.variable} ${serif.variable} font-sans overflow-y-scroll scroll-auto antialiased text-sm selection:bg-indigo-100 selection:text-indigo-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-screen-2xl">
          <ThemeProvider defaultTheme="light" attribute="class">
            <Sidebar />
            <main className="lg:pl-52 bg-blue-50">{children}</main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}

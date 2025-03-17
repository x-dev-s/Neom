import { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Inter, Archivo_Black, Anton } from "next/font/google"
import "./globals.css"
import { siteConfig } from "@/app/siteConfig"
import { Sidebar } from "@/components/UI/Navigation/Sidebar"

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
  metadataBase: new URL(`https://neom.vercel.app`),
  title: "Neom PV Diesel Automation",
  description: "",
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
    canonical: `https://neom.vercel.app`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://neom.vercel.app`,
    title: "Neom PV Diesel Automation",
    description: "",
    images: [
      {
        url: `https://neom.vercel.app/images/logo_bg.png`,
        alt: "Neom PV Diesel Automation",
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
        className={`${sans.variable} ${mono.variable} ${serif.variable} font-sans overflow-y-scroll scroll-auto antialiased text-xs selection:bg-indigo-100 selection:text-indigo-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-screen-2xl">
          <ThemeProvider defaultTheme="light" attribute="class">
            <Sidebar />
            <main className="lg:pl-60">{children}</main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}

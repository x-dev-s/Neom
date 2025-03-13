import { Inter, Archivo_Black, Anton } from "next/font/google";
import "./globals.css";
// import Header from "@/components/header";
// import Footer from "@/components/footer";
// import PageLoading from "@/components/pageLoading";
// import Dashboard from "@/components/layout"

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
  description: "Shop a range of latest gadgets and accessories of your favorite brands.",
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
    description: "Shop a range of latest gadgets and accessories of your favorite brands.",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${sans.variable} ${mono.variable} ${serif.variable} font-sans text-black`}>
        <main className="flex flex-col min-h-screen text-sm">
          {children}
        </main>
      </body>
    </html>
  );
}

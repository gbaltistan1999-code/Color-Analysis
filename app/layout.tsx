import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free Color Analysis Online — 100% Free, No Signup",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free color analysis online: find your color season, skin undertone and personal color palette with HEX codes in 3 minutes. 100% free, no signup, photos never leave your device.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Free Color Analysis Online — 100% Free, No Signup",
    description: "Find your color season, undertone and personal palette in 3 minutes. No signup.",
    images: [{ url: "/images/season-map.jpg", width: 1200, height: 1000, alt: "The 12 color seasons" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#7C3AED",
  width: "device-width",
  initialScale: 1,
};

// Light is the default; only a saved choice switches to dark. Runs before paint to avoid a flash.
const themeScript = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.dataset.theme="dark"}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${body.variable} ${heading.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

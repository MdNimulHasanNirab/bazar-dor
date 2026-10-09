import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata = {
  metadataBase: new URL("https://bazardors.vercel.app"),
  applicationName: "বাজার দর",
  title: {
    default: "বাজার দর | নিত্যপণ্যের আজকের বাজারদর",
    template: "%s | বাজার দর",
  },
  description:
    "বাংলাদেশের চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম, দুধ ও মসলার সর্বনিম্ন, সর্বাধিক এবং গড় বাজারদর এক জায়গায় দেখুন।",
  keywords: [
    "বাজার দর",
    "আজকের বাজারদর",
    "নিত্যপণ্যের দাম",
    "বাংলাদেশ বাজার মূল্য",
    "Bazar Dor",
  ],
  authors: [{ name: "NH Nirab" }],
  creator: "NH Nirab",
  publisher: "বাজার দর",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "/",
    siteName: "বাজার দর",
    title: "বাজার দর | নিত্যপণ্যের আজকের বাজারদর",
    description:
      "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বনিম্ন, সর্বাধিক ও গড় বাজারদর এক নজরে দেখুন।",
    images: [
      {
        url: "/assets/bazar-hero.png",
        width: 430,
        height: 430,
        alt: "বাজার দর",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "বাজার দর | নিত্যপণ্যের আজকের বাজারদর",
    description:
      "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বনিম্ন, সর্বাধিক ও গড় বাজারদর এক নজরে দেখুন।",
    images: ["/assets/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/assets/logo-icon.png",
    apple: "/assets/logo-icon.png",
  },
  category: "market prices",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#047c37",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={hind.variable}>
        <Providers>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="site-main-content">{children}</main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
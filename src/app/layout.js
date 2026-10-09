
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "BazarDor | আপনার প্রতিদিনের বাজার",
  description:
    "BazarDor — চাল, ডাল, তেল, সবজি ও নিত্যপ্রয়োজনীয় পণ্য সহজে খুঁজুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Navbar />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
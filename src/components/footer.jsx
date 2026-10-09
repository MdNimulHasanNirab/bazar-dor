
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <h2>বাজার দর</h2>
          <p>
            নিত্যপ্রয়োজনীয় পণ্যের তথ্য সহজে খুঁজে পেতে
            আপনার পাশে আছে বাজার দর।
          </p>
          <p className="mt-4 text-sm">
            © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>

        <div className="footer-links">
          <Link href="/">হোম</Link>
          <Link href="/#categories">ক্যাটাগরি</Link>
          <Link href="/#products">সকল পণ্য</Link>
          <Link href="/signin">সাইন ইন</Link>
          <Link href="/signup">নিবন্ধন</Link>
        </div>
      </div>
    </footer>
  );
}
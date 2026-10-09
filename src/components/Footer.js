
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            Bazar<span>Dor</span>
          </Link>
          <p>
            আপনার প্রতিদিনের বাজার এখন আরও সহজ।
            প্রয়োজনীয় পণ্য খুঁজুন এক জায়গায়।
          </p>
        </div>

        <div>
          <h3>দ্রুত লিংক</h3>
          <Link href="/">হোম</Link>
          <Link href="/#categories">ক্যাটাগরি</Link>
          <Link href="/#products">পণ্যসমূহ</Link>
        </div>

        <div>
          <h3>আপনার অ্যাকাউন্ট</h3>
          <Link href="/signin">সাইন ইন</Link>
          <Link href="/signup">সাইন আপ</Link>
          <Link href="/profile">প্রোফাইল</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} BazarDor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
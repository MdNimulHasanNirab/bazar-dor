import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-white">
      <div className="container-main flex flex-col justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/"
            className="text-lg font-extrabold text-[var(--green)]"
          >
            বাজার দর
          </Link>
          <p className="mt-1 text-sm text-gray-500">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <p className="max-w-md text-sm leading-6 text-gray-500 sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
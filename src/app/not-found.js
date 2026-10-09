import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-main flex min-h-[65vh] flex-col items-center justify-center py-12 text-center">
      <div className="text-7xl">🔎</div>

      <h1 className="mt-5 text-3xl font-extrabold">৪০৪ — পেজ পাওয়া যায়নি</h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
        আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। লিংকটি পরীক্ষা করে আবার চেষ্টা করুন।
      </p>

      <Link href="/" className="btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
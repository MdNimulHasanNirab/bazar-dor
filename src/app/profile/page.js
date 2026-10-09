import Link from "next/link";

export default function ProfilePage() {
  return (
    <section className="container-main min-h-[65vh] py-10">
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
            👤
          </div>

          <div>
            <h1 className="text-2xl font-extrabold">আমার প্রোফাইল</h1>
            <p className="mt-1 text-sm text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য
            </p>
          </div>
        </div>

        <div className="mt-7 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">নাম</p>
          <p className="mt-1 font-semibold">ব্যবহারকারীর নাম</p>
          <p className="mt-4 text-sm text-gray-500">ইমেইল</p>
          <p className="mt-1 font-semibold">ব্যবহারকারীর ইমেইল</p>
        </div>

        <Link href="/profile/update" className="btn-primary mt-6 w-full">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </section>
  );
}
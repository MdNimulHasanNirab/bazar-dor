"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-main flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="text-6xl">⚠️</div>
      <h1 className="mt-5 text-2xl font-extrabold">
        কিছু একটা সমস্যা হয়েছে
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        অনুগ্রহ করে আবার চেষ্টা করুন।
      </p>

      <div className="mt-6 flex gap-3">
        <button onClick={reset} className="btn-primary">
          আবার চেষ্টা করুন
        </button>
        <Link href="/" className="btn-secondary">
          হোম পেজ
        </Link>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    // Connect Better Auth's updateUser method here.
    toast.error("প্রোফাইল আপডেট করার জন্য অথেনটিকেশন সংযোগ প্রয়োজন।");
  }

  return (
    <section className="container-main min-h-[65vh] py-10">
      <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <Link href="/profile" className="text-sm text-gray-500">
          ← প্রোফাইলে ফিরে যান
        </Link>

        <h1 className="mt-5 text-2xl font-extrabold">
          ব্যক্তিগত তথ্য আপডেট
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
        </p>

        <form onSubmit={handleSubmit} className="mt-7">
          <label className="mb-2 block text-sm font-semibold">
            আপনার নাম
          </label>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="নতুন নাম লিখুন"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
          />

          <button
            disabled={loading}
            className="btn-primary mt-5 w-full"
          >
            {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
          </button>
        </form>
      </div>
    </section>
  );
}
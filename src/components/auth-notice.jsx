"use client";

import { useSearchParams } from "next/navigation";

export function AuthNotice() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  if (!registered) return null;

  return (
    <div className="p-3 mb-4 bg-emerald-50 text-emerald-800 text-sm rounded-lg text-center font-medium border border-emerald-200">
      অ্যাকাউন্ট তৈরি সফল হয়েছে। আপনার তথ্য দিয়ে সাইন ইন করুন।
    </div>
  );
}

export default AuthNotice;
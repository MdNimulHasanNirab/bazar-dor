"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthForm({ mode = "signin" }) {
  const isSignup = mode === "signup";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSignup && !name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন");
      return;
    }

    setLoading(true);

    try {
      const result = isSignup
        ? await authClient.signUp.email({
            name,
            email,
            password,
          })
        : await authClient.signIn.email({
            email,
            password,
          });

      if (result.error) {
        toast.error(result.error.message || "অনুরোধ সফল হয়নি");
        return;
      }

      toast.success(
        isSignup ? "অ্যাকাউন্ট তৈরি হয়েছে" : "সফলভাবে সাইন ইন হয়েছে"
      );

      router.push(isSignup ? "/signin" : "/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial(provider) {
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result?.error) {
        toast.error(result.error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
      }
    } catch {
      toast.error("সোশ্যাল লগইন চালু করা যায়নি");
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-7 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
          🛒
        </div>

        <h1 className="mt-4 text-2xl font-extrabold">
          {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "স্বাগতম ফিরে আসায়"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {isSignup
            ? "বাজারদর জানতে আপনার অ্যাকাউন্ট খুলুন"
            : "আপনার অ্যাকাউন্টে সাইন ইন করুন"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <label className="mb-2 block text-sm font-semibold">
              আপনার নাম
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার পুরো নাম"
              autoComplete="name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            ইমেইল
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="আপনার পাসওয়ার্ড"
            autoComplete={isSignup ? "new-password" : "current-password"}
            minLength={8}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <button
          disabled={loading}
          className="btn-primary w-full !py-3 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "অপেক্ষা করুন..."
            : isSignup
              ? "সাইন আপ করুন"
              : "সাইন ইন করুন"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">অথবা</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocial("google")}
          className="btn-secondary gap-2"
        >
          <span className="font-bold">G</span> Google
        </button>

        <button
          type="button"
          onClick={() => handleSocial("github")}
          className="btn-secondary gap-2"
        >
          <span className="font-bold">⌘</span> GitHub
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        {isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
        <Link
          href={isSignup ? "/signin" : "/signup"}
          className="font-bold text-[var(--green)] hover:underline"
        >
          {isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
        </Link>
      </p>
    </div>
  );
}
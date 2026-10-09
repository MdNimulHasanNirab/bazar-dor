"use client";

import Link from "next/link";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function AuthForm({ mode }) {
  const signup = mode === "signup";
  const [loading, setLoading] = useState(null);

  async function submit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email")).trim().toLowerCase();
    const password = String(fd.get("password"));
    const confirmPassword = String(fd.get("confirmPassword") ?? "");
    const name = String(fd.get("name") ?? "").trim();

    if (signup && password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মেলেনি");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading("email");
    try {
      const response = signup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (response?.error) {
        console.error("Auth Server Error:", response.error);
        toast.error(
          response.error.message ||
            (signup ? "অ্যাকাউন্ট তৈরি করা যায়নি" : "ইমেইল বা পাসওয়ার্ড সঠিক নয়")
        );
        return;
      }

      toast.success(
        signup
          ? "অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন"
          : "সফলভাবে সাইন ইন হয়েছে"
      );

      window.location.assign(signup ? "/signin?registered=true" : "/");
    } catch (err) {
      console.error("Client Submit Error:", err);
      toast.error("অনুরোধ ব্যর্থ হয়েছে। আবার চেষ্টা করুন");
    } finally {
      setLoading(null);
    }
  }

  async function social(provider) {
    setLoading(provider);
    try {
      const res = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
      if (res?.error) {
        toast.error(res.error.message || `${provider} লগইন সফল হয়নি`);
      }
    } catch (err) {
      console.error("Social Login Error:", err);
      toast.error(`${provider} ক্রেডেনশিয়ালস সেটআপ করা নেই`);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F4F6F4] px-4 py-12">
      {/* Top Heading */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {signup
            ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
            : "আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন।"}
        </p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <form onSubmit={submit} className="space-y-4">
          {signup && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                নাম
              </label>
              <input
                name="name"
                required
                placeholder="যেমন: রহিম উদ্দিন"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              name="password"
              type="password"
              minLength={8}
              required
              autoComplete={signup ? "new-password" : "current-password"}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {signup && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                name="confirmPassword"
                type="password"
                minLength={8}
                required
                autoComplete="new-password"
                placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading !== null}
            className="w-full rounded-lg bg-[#047857] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#065f46] disabled:opacity-50"
          >
            {loading === "email" ? (
              <span className="flex items-center justify-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                অপেক্ষা করুন...
              </span>
            ) : signup ? (
              "অ্যাকাউন্ট তৈরি করুন"
            ) : (
              "সাইন ইন করুন"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400">
            অথবা
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => social("google")}
            disabled={loading !== null}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {loading === "google" ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={() => social("github")}
            disabled={loading !== null}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {loading === "github" ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <GitHubIcon />
            )}
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* Auth Mode Toggle Link */}
        <p className="mt-6 text-center text-xs text-gray-600">
          {signup ? "অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
          <Link
            href={signup ? "/signin" : "/signup"}
            className="font-semibold text-emerald-600 hover:underline"
          >
            {signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>

      {/* Return to Home */}
      <Link
        href="/"
        className="mt-6 text-xs text-gray-500 hover:text-gray-800 transition"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.37l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.6 0-4.81-1.76-5.6-4.13H3.06v2.62A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.92A6 6 0 0 1 6.08 12c0-.67.12-1.32.32-1.92V7.46H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.54l3.34-2.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.95c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.94 5.46l3.34 2.62c.79-2.37 3-4.13 5.6-4.13Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.02c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.41-1.26.74-1.55-2.58-.3-5.29-1.29-5.29-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.42-2.72 5.39-5.3 5.68.42.36.79 1.07.79 2.16v3.03c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
      />
    </svg>
  );
}

export default AuthForm;
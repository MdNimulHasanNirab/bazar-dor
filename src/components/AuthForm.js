
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

export default function AuthForm({ mode = "signin" }) {
  const isSignup = mode === "signup";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        const result = await authClient.signUp.email({
          name,
          email,
          password,
        });

        if (result.error) {
          throw new Error(
            result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
          );
        }
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
        });

        if (result.error) {
          throw new Error(
            result.error.message || "সাইন ইন করা যায়নি।"
          );
        }
      }

      router.push("/profile");
      router.refresh();
    } catch (err) {
      setError(
        err.message || "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-icon">{isSignup ? "✨" : "👋"}</div>

      <h1>{isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "স্বাগতম ফিরে!"}</h1>
      <p className="auth-subtitle">
        {isSignup
          ? "BazarDor-এ যোগ দিন এবং বাজার করা সহজ করুন।"
          : "আপনার অ্যাকাউন্টে প্রবেশ করুন।"}
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignup && (
          <div className="form-group">
            <label htmlFor="name">আপনার নাম</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="আপনার পুরো নাম"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">ইমেইল ঠিকানা</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">পাসওয়ার্ড</label>
          <input
            id="password"
            type="password"
            autoComplete={
              isSignup ? "new-password" : "current-password"
            }
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button
          className="button button-primary auth-submit"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "অপেক্ষা করুন..."
            : isSignup
              ? "অ্যাকাউন্ট তৈরি করুন"
              : "সাইন ইন করুন"}
        </button>
      </form>

      <p className="auth-switch">
        {isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "নতুন ব্যবহারকারী?"}{" "}
        <Link href={isSignup ? "/signin" : "/signup"}>
          {isSignup ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
        </Link>
      </p>
    </div>
  );
}
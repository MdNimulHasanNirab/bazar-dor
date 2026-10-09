
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../../lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const result = await authClient.updateUser({ name: name.trim() });

      if (result.error) {
        throw new Error(
          result.error.message || "প্রোফাইল আপডেট করা যায়নি।"
        );
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch (err) {
      setError(err.message || "একটি সমস্যা হয়েছে।");
    } finally {
      setSaving(false);
    }
  }

  if (isPending || !session) {
    return (
      <div className="container page-message">
        <p>লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="container inner-page update-page">
      <div className="breadcrumbs">
        <Link href="/profile">প্রোফাইল</Link> / আপডেট
      </div>

      <div className="update-card">
        <span className="eyebrow">অ্যাকাউন্ট সেটিংস</span>
        <h1>প্রোফাইল আপডেট করুন</h1>
        <p>আপনার নাম পরিবর্তন করতে নিচের ফর্মটি ব্যবহার করুন।</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="profile-name">আপনার নাম</label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="profile-email">ইমেইল</label>
            <input
              id="profile-email"
              type="email"
              value={session.user.email || ""}
              readOnly
            />
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}
          {message && (
            <p className="form-success" role="status">{message}</p>
          )}

          <button
            className="button button-primary"
            type="submit"
            disabled={saving}
          >
            {saving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
          </button>

          <Link href="/profile" className="text-link">
            ← প্রোফাইলে ফিরে যান
          </Link>
        </form>
      </div>
    </div>
  );
}

"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="container not-found">
      <span className="not-found-icon">⚠️</span>
      <h1>কিছু একটা সমস্যা হয়েছে</h1>
      <p>পেজটি আবার লোড করে দেখুন।</p>

      {process.env.NODE_ENV === "development" && (
        <p className="form-error">{error.message}</p>
      )}

      <button
        type="button"
        className="button button-primary"
        onClick={() => reset()}
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}

import Link from "next/link";
import AuthForm from "../../components/AuthForm";

export const metadata = {
  title: "সাইন ইন | BazarDor",
};

export default function SignInPage() {
  return (
    <section className="auth-page">
      <div className="auth-side">
        <Link href="/" className="auth-brand">
          Bazar<span>Dor</span>
        </Link>

        <h2>আপনার বাজারের যাত্রা শুরু হোক এখান থেকে।</h2>
        <p>
          সাইন ইন করে আপনার অ্যাকাউন্টে প্রবেশ করুন।
        </p>
        <span className="auth-side-emoji">🛒 🥬 🍅</span>
      </div>

      <div className="auth-main">
        <AuthForm mode="signin" />
      </div>
    </section>
  );
}
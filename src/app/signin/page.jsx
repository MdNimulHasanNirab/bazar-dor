// src/app/signin/page.jsx
import { Suspense } from "react";
import AuthForm from "@/components/auth-form";
import AuthNotice from "@/components/auth-notice";

export default function SignIn() {
  return (
    <section className="auth-page">
      <Suspense fallback={null}>
        <AuthNotice />
      </Suspense>
      <AuthForm mode="signin" />
    </section>
  );
}
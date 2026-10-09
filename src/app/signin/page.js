import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
  return (
    <section className="container-main flex min-h-[70vh] items-center justify-center py-12">
      <AuthForm mode="signin" />
    </section>
  );
}
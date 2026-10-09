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
      toast.error(response.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }

    toast.success(
      signup
        ? "অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন"
        : "সফলভাবে সাইন ইন হয়েছে"
    );

    window.location.assign(signup ? "/signin?registered=true" : "/");
  } catch (err) {
    console.error("Client Submit Catch Error:", err);
    toast.error("সার্ভার প্রতিক্রিয়া জানায়নি। MONGODB_URI ও API Route পরীক্ষা করুন।");
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
    toast.error(`${provider} ক্রেডেনশিয়ালস বা API Route অনুপস্থিত`);
  } finally {
    setLoading(null);
  }
}
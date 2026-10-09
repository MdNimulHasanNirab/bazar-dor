"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const subscribe = () => () => {};
const getDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

const categories = [
  ["chal", "চাল"],
  ["dal", "ডাল"],
  ["tel", "তেল"],
  ["sobji", "সবজি"],
  ["mach", "মাছ"],
  ["mangsho", "মাংস"],
  ["dim-dui", "ডিম-দুধ"],
  ["mosla", "মসলা"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const date = useSyncExternalStore(subscribe, getDate, () => "আজকের বাজার");
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  async function logout() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  }

  return (
    <header className="site-header">
      {/* Top Header Bar */}
      <div className="topbar full-width-row">
        <Link href="/" className="brand">
          <Image src="/assets/logo.png" width={34} height={34} alt="" />
          <span>
            <b>বাজার দর</b>
            <small suppressHydrationWarning>{date}</small>
          </span>
        </Link>
        <div className="auth-actions">
          {!isPending && session ? (
            <>
              <Link className="btn ghost" href="/profile">
                প্রোফাইল
              </Link>
              <button className="btn primary" onClick={logout}>
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link className="btn ghost" href="/signin">
                সাইন ইন
              </Link>
              <Link className="btn primary" href="/signup">
                সাইন আপ
              </Link>
            </>
          )}
          <button
            className="menu-btn"
            aria-label="মেনু"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Category Navigation Bar Below Topbar */}
      <nav className="desktop-nav full-width-row">
        <Link className={pathname === "/" ? "active" : undefined} href="/">
          হোম
        </Link>
        {categories.map(([s, n]) => (
          <Link
            className={pathname === `/category/${s}` ? "active" : undefined}
            key={s}
            href={`/category/${s}`}
          >
            {n}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation Drawer */}
      {open && (
        <nav className="mobile-nav">
          <Link
            href="/"
            className={pathname === "/" ? "active" : undefined}
            onClick={() => setOpen(false)}
          >
            হোম
          </Link>
          {session && (
            <Link href="/profile" onClick={() => setOpen(false)}>
              প্রোফাইল
            </Link>
          )}
          {categories.map(([s, n]) => (
            <Link
              onClick={() => setOpen(false)}
              key={s}
              href={`/category/${s}`}
            >
              {n}
            </Link>
          ))}
        </nav>
      )}

      {/* Ticker Bar */}
      <div className="ticker full-width-row">
        <div>
          🍚 মিনিকেট চাল ৯৯ টাকা/কেজি <em>▼ ২.৯%</em>  🧅 পেঁয়াজ ৬৮ টাকা/কেজি{" "}
          <b>▲ ৪.৬%</b>  🥚 ডিম ১৫৮ টাকা/ডজন <b>▲ ৩.৯%</b>  🧄 রসুন ১২৫
          টাকা/কেজি <em>▼ ৭.৪%</em>  🫚 আদা ৮৫ টাকা/কেজি <b>▲ ৯.০%</b>
        </div>
      </div>
    </header>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useSyncExternalStore, useRef, useEffect } from "react";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const date = useSyncExternalStore(subscribe, getDate, () => "আজকের বাজার");
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function logout() {
    setDropdownOpen(false);
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
            /* Logged-In State with Profile Dropdown */
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 transition-colors focus:outline-none"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                    {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-800">
                  {session.user?.name || "User"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 z-50">
                  <div className="border-b border-gray-100 pb-3">
                    <p className="text-sm font-semibold text-gray-900">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user?.email}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="h-4 w-4 text-blue-600" />
                      <span>আমার প্রোফাইল</span>
                    </Link>

                    <button
                      onClick={logout}
                      className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4 text-rose-600" />
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged-Out State */
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
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { User, LogOut, ChevronDown } from "lucide-react";

export default function UserMenu() {
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isPending) {
    return <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />;
  }

  // If user is not logged in, show Sign In link
  if (!session?.user) {
    return (
      <Link
        href="/signin"
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
      >
        সাইনিং করুন
      </Link>
    );
  }

  const { user } = session;

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* User Header Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-1 text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
        <span className="text-sm font-medium text-gray-800">
          {user.name || "User"}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {/* Floating Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 z-50">
          {/* User Info Header */}
          <div className="border-b border-gray-100 pb-3">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Menu Actions */}
          <div className="pt-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="h-4 w-4 text-blue-600" />
              <span>আমার প্রোফাইল</span>
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
            >
              <LogOut className="h-4 w-4 text-rose-600" />
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
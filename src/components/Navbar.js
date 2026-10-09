"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

const categoryIcons = {
  chal: "🍚",
  vegetables: "🥬",
  fish: "🐟",
  meat: "🍗",
  oil: "🫙",
  default: "🛒",
};

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState("");
  const [active, setActive] = useState("সব");

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        dateStyle: "full",
      }).format(new Date())
    );

    getCategories().then(setCategories).catch(() => {});
    getProducts().then(setProducts).catch(() => {});
  }, []);

  function getPrice(product) {
    return product.price ?? product.currentPrice ?? product.current_price ?? 0;
  }

  function getChange(product) {
    return Number(product.changePercentage ?? product.change ?? 0);
  }

  return (
    <header className="border-b border-[var(--border)] bg-white">
      <div className="container-main">
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[var(--green-light)]">
              <Image
                src="/images/logo.png"
                alt="বাজার দর"
                width={40}
                height={40}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <div className="text-xl font-extrabold text-[var(--green)]">
                বাজার দর
              </div>
              <p className="max-w-[210px] truncate text-[10px] text-gray-500">
                {date || "নিত্যপ্রয়োজনীয় পণ্যের দাম"}
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <Link href="/signin" className="btn-secondary">
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn-primary">
              সাইন আপ
            </Link>
          </div>

          <div className="flex gap-2 sm:hidden">
            <Link
              href="/signin"
              className="rounded-lg border px-3 py-2 text-sm"
            >
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn-primary !px-3">
              সাইন আপ
            </Link>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto border-t border-gray-100 py-3">
          <Link
            href="/"
            onClick={() => setActive("সব")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
              active === "সব"
                ? "bg-[var(--green)] text-white"
                : "bg-gray-50 text-gray-600 hover:bg-green-50"
            }`}
          >
            সব পণ্য
          </Link>

          {categories.map((category, index) => {
            const name =
              category.name ?? category.title ?? category.slug ?? "ক্যাটাগরি";
            const slug = category.slug ?? category.id;

            return (
              <Link
                key={slug ?? index}
                href={`/category/${encodeURIComponent(slug)}`}
                onClick={() => setActive(name)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                  active === name
                    ? "bg-[var(--green)] text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-green-50"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="overflow-hidden border-y border-green-100 bg-green-50">
        <div className="ticker-track flex w-max items-center gap-8 py-3">
          {[...products, ...products].map((product, index) => {
            const name = product.name ?? product.title ?? "পণ্য";
            const change = getChange(product);

            return (
              <div
                key={`${product.id ?? name}-${index}`}
                className="flex items-center gap-2 text-xs"
              >
                <span>{product.emoji ?? "🛒"}</span>
                <span className="font-semibold">{name}</span>
                <span className="font-bold text-[var(--green)]">
                  {formatPrice(getPrice(product))}
                </span>
                <span
                  className={
                    change > 0
                      ? "text-red-600"
                      : change < 0
                        ? "text-green-700"
                        : "text-gray-500"
                  }
                >
                  {change > 0 ? "▲" : change < 0 ? "▼" : "—"}{" "}
                  {Math.abs(change).toLocaleString("bn-BD")}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker 45s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </header>
  );
}
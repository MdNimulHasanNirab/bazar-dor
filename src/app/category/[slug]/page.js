"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCategories, getCategoryProducts } from "@/lib/api";
import { sortProducts } from "@/lib/utils";

export default function CategoryPage() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(false);

    Promise.all([getCategories(), getCategoryProducts(slug)])
      .then(([allCategories, items]) => {
        if (cancelled) return;

        setCategories(allCategories);

        const categoryExists = allCategories.some(
          (category) =>
            String(category.slug ?? category.id) === slug ||
            String(category.name ?? category.title) === slug
        );

        if (!categoryExists || !items.length) {
          setError(true);
          setProducts([]);
          return;
        }

        setProducts(items);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const category = categories.find(
    (item) =>
      String(item.slug ?? item.id) === slug ||
      String(item.name ?? item.title) === slug
  );

  const visibleProducts = sortProducts(products, sort);

  return (
    <section className="container-main min-h-[60vh] py-9">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link href="/" className="text-sm text-gray-500 hover:text-green-700">
            হোম <span className="mx-1">/</span> ক্যাটাগরি
          </Link>

          <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            {category?.name ?? category?.title ?? "পণ্যের ক্যাটাগরি"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরির পণ্যের বর্তমান বাজারদর
          </p>
        </div>

        <label className="flex items-center gap-3 text-sm">
          <span className="shrink-0 text-gray-600">সাজান:</span>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="max-w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="loading-card" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
          <div className="text-5xl">🔎</div>
          <h2 className="mt-4 text-xl font-bold">
            কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরি নেই অথবা বর্তমানে কোনো পণ্য পাওয়া যাচ্ছে না।
          </p>
          <Link href="/" className="btn-primary mt-6">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-500">
            {visibleProducts.length.toLocaleString("bn-BD")} টি পণ্য
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id ?? product.slug ?? index}
                product={product}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
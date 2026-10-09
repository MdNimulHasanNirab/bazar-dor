"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default function ProductSections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const getChange = (product) =>
    Number(product.changePercentage ?? product.change ?? 0);

  const risers = [...products]
    .filter((product) => getChange(product) > 0)
    .sort((a, b) => getChange(b) - getChange(a))
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => getChange(product) < 0)
    .sort((a, b) => getChange(a) - getChange(b))
    .slice(0, 6);

  function renderGrid(items) {
    if (loading) {
      return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="loading-card" />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <p className="rounded-xl bg-white p-6 text-sm text-gray-500">
          পণ্যের তথ্য পাওয়া যায়নি। পেজটি আবার রিফ্রেশ করুন।
        </p>
      );
    }

    if (!items.length) {
      return (
        <p className="rounded-xl bg-white p-6 text-sm text-gray-500">
          এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
        </p>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((product, index) => (
          <ProductCard
            key={product.id ?? product.slug ?? index}
            product={product}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <section className="section">
        <div className="container-main">
          <div className="section-heading">
            <div>
              <h2>আজ দাম বেড়েছে ▲</h2>
              <p>যেসব পণ্যের দাম আজ ঊর্ধ্বমুখী</p>
            </div>
          </div>

          {renderGrid(risers)}
        </div>
      </section>

      <section className="section">
        <div className="container-main">
          <div className="section-heading">
            <div>
              <h2>আজ দাম কমেছে ▼</h2>
              <p>যেসব পণ্যের দাম আজ কমেছে</p>
            </div>
          </div>

          {renderGrid(fallers)}
        </div>
      </section>

      <section className="section" id="সব-পণ্য">
        <div className="container-main">
          <div className="section-heading">
            <div>
              <h2>সব পণ্য</h2>
              <p>নিত্যপ্রয়োজনীয় পণ্যের বর্তমান বাজারদর</p>
            </div>

            <span className="rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
              {products.length.toLocaleString("bn-BD")} টি পণ্য
            </span>
          </div>

          {renderGrid(products)}
        </div>
      </section>
    </>
  );
}
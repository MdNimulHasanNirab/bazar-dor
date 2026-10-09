
import Link from "next/link";
import ProductCard from "./ProductCard";
import { getCategoryName } from "../lib/utils";

export function CategorySection({ categories = [] }) {
  return (
    <section className="section" id="categories">
      <div className="section-heading">
        <div>
          <span className="eyebrow">বাজার করুন সহজে</span>
          <h2>ক্যাটাগরি অনুযায়ী বাজার</h2>
          <p>আপনার প্রয়োজনীয় পণ্যটি বেছে নিন।</p>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            href={`/category/${encodeURIComponent(
              category.slug || category.id
            )}`}
            className="category-card"
            key={category.id || category.slug}
          >
            <span className="category-icon">
              {category.icon || "🛒"}
            </span>
            <span className="category-name">
              {getCategoryName(category)}
            </span>
            <span className="category-arrow">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ProductSection({
  products = [],
  title = "জনপ্রিয় পণ্য",
  subtitle = "আপনার প্রতিদিনের বাজারের জন্য",
  id = "products",
}) {
  return (
    <section className="section" id={id}>
      <div className="section-heading">
        <div>
          <span className="eyebrow">আপনার পছন্দের বাজার</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <Link href="/#categories" className="text-link">
          সব ক্যাটাগরি দেখুন →
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={
                product.id ||
                product._id ||
                product.slug ||
                index
              }
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>🛍️</span>
          <h3>এখন কোনো পণ্য পাওয়া যায়নি</h3>
          <p>পরে আবার চেষ্টা করুন।</p>
        </div>
      )}
    </section>
  );
}
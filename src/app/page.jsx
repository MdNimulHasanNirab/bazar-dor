
import Link from "next/link";
import Image from "next/image";

import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product-card";

const categories = [
  { slug: "chal", name: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", icon: "🫘" },
  { slug: "tel", name: "তেল", icon: "🫗" },
  { slug: "sobji", name: "সবজি", icon: "🥬" },
  { slug: "mach", name: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", icon: "🥩" },
  { slug: "dim-dui", name: "ডিম-দুধ", icon: "🥚" },
  { slug: "mosla", name: "মসলা", icon: "🌶️" },
];

export default async function HomePage() {
  let products = [];
  let error = false;

  try {
    products = await getProducts();
    error = !Array.isArray(products);
    if (!Array.isArray(products)) products = [];
  } catch (err) {
    console.error("Homepage product loading error:", err);
    error = true;
  }

  const featuredProducts = products.slice(0, 6);

  const risingProducts = products
    .filter((product) => product.change?.dir === "up")
    .slice(0, 3);

  const fallingProducts = products
    .filter((product) => product.change?.dir === "down")
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">বাংলাদেশের দৈনিক বাজারদর</span>

            <h1>
              বাজারের সঠিক তথ্য,
              <br />
              <span>সিদ্ধান্ত হোক সহজ</span>
            </h1>

            <p>
              নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, বাজারভিত্তিক
              মূল্যসীমা এবং দামের পরিবর্তন জানুন এক জায়গায়।
              বাজারে যাওয়ার আগে দেখে নিন আজকের বাজারদর।
            </p>

            <Link href="#today-prices" className="btn primary hero-btn">
              আজকের বাজারদর দেখুন →
            </Link>

            <div className="hero-stats">
              <span>
                <b>{products.length.toLocaleString("bn-BD")}</b>
                পণ্যের তথ্য
              </span>

              <span>
                <b>{categories.length.toLocaleString("bn-BD")}</b>
                পণ্যের ক্যাটাগরি
              </span>

              <span>
                <b>প্রতিদিন</b>
                বাজারদর দেখুন
              </span>
            </div>
          </div>

          <div className="hero-art">
            <div className="orb one" />
            <div className="orb two" />

            <Image
              src="/assets/hero.png"
              alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
              width={430}
              height={430}
              priority
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="kicker">ক্যাটাগরি</span>
              <h2>কোন পণ্যের দাম জানতে চান?</h2>
              <p>আপনার প্রয়োজনীয় ক্যাটাগরি নির্বাচন করুন।</p>
            </div>
          </div>

          <div className="home-category-grid">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="home-category-card"
              >
                <span className="home-category-icon">
                  {category.icon}
                </span>

                <span className="home-category-name">
                  {category.name}
                </span>

                <span className="home-category-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Today's prices */}
      <section className="section soft" id="today-prices">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="kicker">আজকের বাজার</span>
              <h2>নিত্যপ্রয়োজনীয় পণ্যের দাম</h2>
              <p>
                API থেকে পাওয়া পণ্যের বর্তমান দাম ও পরিবর্তন।
              </p>
            </div>
          </div>

          {error ? (
            <div className="home-message">
              <h3>পণ্যের তথ্য লোড করা যায়নি</h3>
              <p>
                ইন্টারনেট সংযোগ অথবা API পরীক্ষা করে আবার চেষ্টা করো।
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="home-message">
              <h3>এখন কোনো পণ্যের তথ্য পাওয়া যায়নি</h3>
              <p>কিছুক্ষণ পর আবার চেষ্টা করো।</p>
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}

          {products.length > 6 && (
            <div className="home-view-all">
              <Link href="#all-products" className="btn ghost">
                আরও পণ্য দেখুন →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Price movement */}
      {(risingProducts.length > 0 || fallingProducts.length > 0) && (
        <section className="section" id="price-changes">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="kicker">দামের পরিবর্তন</span>
                <h2>কোন পণ্যের দাম বাড়ছে বা কমছে?</h2>
                <p>API-তে দেওয়া পরিবর্তনের দিক অনুযায়ী পণ্য।</p>
              </div>
            </div>

            {risingProducts.length > 0 && (
              <div className="price-change-block">
                <h3 className="kicker up">↑ দাম বেড়েছে</h3>
                <ProductGrid products={risingProducts} />
              </div>
            )}

            {fallingProducts.length > 0 && (
              <div className="price-change-block">
                <h3 className="kicker down">↓ দাম কমেছে</h3>
                <ProductGrid products={fallingProducts} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* All products */}
      {products.length > 6 && (
        <section className="section soft" id="all-products">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="kicker">সব পণ্য</span>
                <h2>সব পণ্যের বাজারদর</h2>
                <p>সব পণ্যের বিস্তারিত দেখতে যেকোনো কার্ডে ক্লিক করুন।</p>
              </div>
            </div>

            <ProductGrid products={products} />
          </div>
        </section>
      )}
    </>
  );
}

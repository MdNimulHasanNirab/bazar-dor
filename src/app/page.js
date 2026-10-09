
import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "../lib/api";
import {
  CategorySection,
  ProductSection,
} from "../components/ProductSections";

export default async function HomePage() {
  let categories = [];
  let products = [];
  let apiError = false;

  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
  } catch (error) {
    console.error("BazarDor API error:", error);
    apiError = true;
  }

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-label">
              <span className="status-dot" />
              আপনার প্রতিদিনের বাজার
            </span>

            <h1>
              বাজার হবে সহজ,
              <br />
              <span>সাশ্রয়ী আর আনন্দের।</span>
            </h1>

            <p>
              চাল, ডাল, তেল, সবজি এবং নিত্যপ্রয়োজনীয়
              পণ্য এক জায়গায় খুঁজুন। আপনার বাজারের
              অভিজ্ঞতাকে করুন আরও সহজ।
            </p>

            <div className="hero-actions">
              <Link href="/#products" className="button button-primary">
                পণ্য দেখুন <span>→</span>
              </Link>

              <Link href="/#categories" className="button button-light">
                ক্যাটাগরি দেখুন
              </Link>
            </div>

            <div className="hero-trust">
              <span>✓ সহজে পণ্য খুঁজুন</span>
              <span>✓ একাধিক ক্যাটাগরি</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-decoration decoration-one" />
            <div className="hero-decoration decoration-two" />

            <div className="hero-image-frame">
              <Image
                src="/images/hero.png"
                alt="তাজা বাজারের পণ্য"
                width={620}
                height={540}
                priority
                className="hero-image"
              />
            </div>

            <div className="floating-card floating-card-top">
              <span>🥬</span>
              <div>
                <strong>তাজা পণ্য</strong>
                <small>বেছে নিন আপনার পছন্দমতো</small>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <span>🛒</span>
              <div>
                <strong>স্মার্ট বাজার</strong>
                <small>সবকিছু এক জায়গায়</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {apiError && (
        <div className="container api-notice" role="status">
          পণ্যের তথ্য এখন লোড করা যাচ্ছে না। কিছুক্ষণ পরে আবার চেষ্টা করুন।
        </div>
      )}

      <div className="container">
        <CategorySection categories={categories} />

        <ProductSection
          products={products.slice(0, 8)}
          title="জনপ্রিয় পণ্য"
          subtitle="আপনার প্রতিদিনের প্রয়োজনীয় পণ্য"
          id="products"
        />

        <section className="promo-banner">
          <div>
            <span className="eyebrow">BazarDor-এর সাথে</span>
            <h2>আপনার বাজার খোঁজা হোক আরও সহজ।</h2>
            <p>
              বিভিন্ন ক্যাটাগরি ঘুরে আপনার প্রয়োজনীয়
              পণ্যটি খুঁজে নিন।
            </p>
            <Link
              href="/#categories"
              className="button button-primary"
            >
              বাজার শুরু করুন →
            </Link>
          </div>

          <div className="promo-illustration" aria-hidden="true">
            🛍️
          </div>
        </section>
      </div>
    </>
  );
}
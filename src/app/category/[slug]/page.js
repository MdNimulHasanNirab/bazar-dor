
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategories,
  getCategory,
  getProducts,
} from "../../../lib/api";
import { ProductSection } from "../../../components/ProductSections";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  let category;
  let products = [];

  try {
    const categories = await getCategories();

    category = categories.find(
      (item) => String(item.slug || item.id) === slug
    );

    if (category) {
      products = await getProducts(category.slug || category.id);
    } else {
      try {
        category = await getCategory(slug);
        products = await getProducts(slug);
      } catch {
        notFound();
      }
    }
  } catch (error) {
    if (error?.digest === "NEXT_HTTP_ERROR_FALLBACK;404") {
      throw error;
    }

    console.error("Category loading error:", error);
    return (
      <div className="container page-message">
        <h1>ক্যাটাগরি লোড করা যায়নি</h1>
        <p>ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
        <Link href="/">হোমে ফিরে যান</Link>
      </div>
    );
  }

  if (!category) notFound();

  return (
    <div className="container inner-page">
      <div className="breadcrumbs">
        <Link href="/">হোম</Link> /{" "}
        {category.nameBn || category.name || slug}
      </div>

      <section className="page-banner">
        <span className="large-category-icon">
          {category.icon || "🛒"}
        </span>
        <span className="eyebrow">পণ্য ক্যাটাগরি</span>
        <h1>{category.nameBn || category.name || slug}</h1>
        <p>এই ক্যাটাগরির পণ্যগুলো দেখে আপনার পছন্দেরটি বেছে নিন।</p>
      </section>

      <ProductSection
        products={products}
        title={`${category.nameBn || category.name || slug} পণ্য`}
        subtitle={`${products.length}টি পণ্য পাওয়া গেছে`}
        id="category-products"
      />
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `${decodeURIComponent(slug)} | BazarDor`,
    description: "BazarDor-এ আপনার প্রয়োজনীয় পণ্য খুঁজুন।",
  };
}
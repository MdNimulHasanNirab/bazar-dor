
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategory } from "@/lib/products";
import CategoryProducts from "@/components/category-products";

function getCategoryIcon(category, categoryName = "", slug = "") {
  if (category?.icon || category?.categoryIcon) {
    return category.icon || category.categoryIcon;
  }

  const value = `${categoryName} ${slug}`.toLowerCase();

  const icons = [
    [["vegetable", "সবজি", "sobji"], "🥬"],
    [["rice", "চাল", "চাউল", "chal"], "🍚"],
    [["fish", "মাছ", "mach"], "🐟"],
    [["meat", "মাংস", "গরু", "মুরগি"], "🥩"],
    [["fruit", "ফল", "fol"], "🍎"],
    [["egg", "ডিম", "dim"], "🥚"],
    [["milk", "dairy", "দুধ", "দুগ্ধ"], "🥛"],
    [["oil", "তেল"], "🫗"],
    [["lentil", "dal", "ডাল"], "🫘"],
    [["spice", "মসলা", "মরিচ", "হলুদ"], "🌶️"],
    [["sugar", "চিনি"], "🍬"],
    [["onion", "পেঁয়াজ", "পিয়াজ"], "🧅"],
    [["potato", "আলু"], "🥔"],
  ];

  for (const [keywords, icon] of icons) {
    if (keywords.some((keyword) => value.includes(keyword))) {
      return icon;
    }
  }

  return "🛒";
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  let result;

  try {
    result = await getCategory(slug);
  } catch (error) {
    console.error("Category page loading error:", error);

    return (
      <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
        <div className="mx-auto max-w-7xl rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">
            ক্যাটাগরির তথ্য লোড করা যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            ইন্টারনেট সংযোগ অথবা API পরীক্ষা করে আবার চেষ্টা করো।
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800"
          >
            হোম পেজে ফিরে যাও
          </Link>
        </div>
      </main>
    );
  }

  const category = result?.category;

  if (!category) {
    notFound();
  }

  const products = Array.isArray(result?.products)
    ? result.products
    : [];

  const categoryName =
    category.nameBn ||
    category.name_bn ||
    category.name ||
    category.title ||
    slug;

  const categoryIcon = getCategoryIcon(
    category,
    categoryName,
    slug
  );

  const formatCount = (count) =>
    new Intl.NumberFormat("bn-BD").format(count);

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-5 sm:px-6 sm:py-7">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm"
        >
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span aria-hidden="true">/</span>
          <span>ক্যাটাগরি</span>
          <span aria-hidden="true">/</span>

          <span className="font-medium text-green-700">
            {categoryName}
          </span>
        </nav>

        {/* Category summary */}
        <section className="mb-5 flex flex-col justify-between gap-4 rounded-2xl border border-[#e4ebe5] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl sm:h-16 sm:w-16">
              {categoryIcon}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {categoryName}
              </h1>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                বাজারদর · {categoryName}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                {formatCount(products.length)}
                টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#f0f5f0] px-4 py-3 sm:min-w-36 sm:text-center">
            <p className="text-xs text-gray-500">মোট পণ্য</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatCount(products.length)}
            </p>

            <p className="text-xs text-gray-500">
              {products.length === 0
                ? "কোনো পণ্য পাওয়া যায়নি"
                : "এই ক্যাটাগরিতে"}
            </p>
          </div>
        </section>

        {/* Product listing; existing sorting and styles are preserved */}
        <CategoryProducts
          products={products}
          categoryName={categoryName}
          slug={slug}
        />
      </div>
    </main>
  );
}
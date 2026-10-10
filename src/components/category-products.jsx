
"use client";

import { useMemo, useState } from "react";

function getProductName(product) {
  return (
    product.nameBn ||
    product.name_bn ||
    product.name ||
    product.title ||
    product.titleBn ||
    product.title_bn ||
    "নাম পাওয়া যায়নি"
  );
}

function getProductPrice(product) {
  const values = [
    product.today,
    product.price,
    product.currentPrice,
    product.current_price,
    product.pricePerKg,
    product.price_per_kg,
    product.minPrice,
  ];

  const value = values.find(
    (item) =>
      item !== null &&
      item !== undefined &&
      item !== "" &&
      Number.isFinite(Number(item))
  );

  return value === undefined ? null : Number(value);
}

function getProductUnit(product) {
  return (
    product.unit ||
    product.unitName ||
    product.unit_name ||
    product.measurementUnit ||
    "kg"
  );
}

// Normalize Bengali/English category names and slugs.
function getCategoryType(categoryName = "", slug = "") {
  const value = `${categoryName} ${slug}`.toLowerCase();

  if (
    value.includes("সবজি") ||
    value.includes("vegetable") ||
    value.includes("sobji") ||
    value.includes("shobji")
  ) return "vegetables";

  if (
    value.includes("চাল") ||
    value.includes("rice") ||
    value.includes("chal")
  ) return "rice";

  if (
    value.includes("মাছ") ||
    value.includes("fish") ||
    value.includes("mach")
  ) return "fish";

  if (
    value.includes("মাংস") ||
    value.includes("meat") ||
    value.includes("mangsho")
  ) return "meat";

  if (
    value.includes("ফল") ||
    value.includes("fruit") ||
    value.includes("fol")
  ) return "fruits";

  if (
    value.includes("ডিম") ||
    value.includes("egg") ||
    value.includes("dim")
  ) return "eggs";

  if (
    value.includes("দুধ") ||
    value.includes("milk")
  ) return "dairy";

  if (
    value.includes("তেল") ||
    value.includes("oil")
  ) return "oil";

  if (
    value.includes("ডাল") ||
    value.includes("dal") ||
    value.includes("lentil")
  ) return "lentils";

  if (
    value.includes("মসলা") ||
    value.includes("spice") ||
    value.includes("mosla")
  ) return "spices";

  if (
    value.includes("চিনি") ||
    value.includes("sugar")
  ) return "sugar";

  return "other";
}

// Header icon changes according to the selected category.
function getCategoryIcon(categoryName, slug) {
  const icons = {
    vegetables: "🥦",
    rice: "🌾",
    fish: "🐟",
    meat: "🥩",
    fruits: "🍎",
    eggs: "🥚",
    dairy: "🥛",
    oil: "🫒",
    lentils: "🫘",
    spices: "🌶️",
    sugar: "🧂",
    other: "🛒",
  };

  return icons[getCategoryType(categoryName, slug)];
}

// Product icons vary by product name instead of repeating one category icon.
function getIndividualProductIcon(product, categoryName, slug) {
  const name = getProductName(product).toLowerCase();

  if (
    name.includes("আলু") ||
    name.includes("potato")
  ) return "🥔";

  if (
    name.includes("পেঁয়াজ") ||
    name.includes("পেঁয়াজ") ||
    name.includes("onion")
  ) return "🧅";

  if (
    name.includes("কাঁচামরিচ") ||
    name.includes("মরিচ") ||
    name.includes("chili") ||
    name.includes("chilli")
  ) return "🌶️";

  if (
    name.includes("টমেটো") ||
    name.includes("tomato")
  ) return "🍅";

  if (
    name.includes("বেগুন") ||
    name.includes("eggplant")
  ) return "🍆";

  if (
    name.includes("গাজর") ||
    name.includes("carrot")
  ) return "🥕";

  if (
    name.includes("রসুন") ||
    name.includes("garlic")
  ) return "🧄";

  if (
    name.includes("আদা") ||
    name.includes("ginger")
  ) return "🫚";

  if (
    name.includes("শসা") ||
    name.includes("cucumber")
  ) return "🥒";

  if (
    name.includes("লেবু") ||
    name.includes("lemon")
  ) return "🍋";

  if (
    name.includes("কলা") ||
    name.includes("banana")
  ) return "🍌";

  if (
    name.includes("আপেল") ||
    name.includes("apple")
  ) return "🍎";

  if (
    name.includes("ডিম") ||
    name.includes("egg")
  ) return "🥚";

  if (
    name.includes("মাছ") ||
    name.includes("fish")
  ) return "🐟";

  if (
    name.includes("মুরগি") ||
    name.includes("chicken")
  ) return "🍗";

  if (
    name.includes("গরু") ||
    name.includes("beef")
  ) return "🥩";

  return getCategoryIcon(categoryName, slug);
}

function formatPrice(price) {
  return price.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

function getPriceChange(product) {
  const change = product.change;

  if (!change || typeof change !== "object") {
    return null;
  }

  const direction = String(change.dir || "").toLowerCase();
  const percentage = Number(change.pct);

  if (
    change.pct === null ||
    change.pct === undefined ||
    change.pct === "" ||
    !Number.isFinite(percentage)
  ) {
    return null;
  }

  return {
    direction,
    text: `${Math.abs(percentage)}%`,
  };
}

export default function CategoryProducts({
  products = [],
  categoryName = "",
  slug = "",
}) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "low") {
      result.sort((a, b) => {
        const priceA = getProductPrice(a);
        const priceB = getProductPrice(b);

        if (priceA === null) return 1;
        if (priceB === null) return -1;

        return priceA - priceB;
      });
    }

    if (sortBy === "high") {
      result.sort((a, b) => {
        const priceA = getProductPrice(a);
        const priceB = getProductPrice(b);

        if (priceA === null) return 1;
        if (priceB === null) return -1;

        return priceB - priceA;
      });
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        getProductName(a).localeCompare(getProductName(b), "bn")
      );
    }

    return result;
  }, [products, sortBy]);

  const categoryIcon = getCategoryIcon(categoryName, slug);

  if (products.length === 0) {
    return (
      <section className="rounded-2xl border border-gray-100 bg-white px-5 py-14 text-center shadow-sm">
        <div className="mb-3 text-4xl">
          {categoryIcon}
        </div>

        <h2 className="text-lg font-bold text-gray-800">
          কোনো পণ্য পাওয়া যায়নি
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই।
        </p>
      </section>
    );
  }

  return (
    <section>
      {/* Sorting bar */}
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          মোট{" "}
          <span className="font-bold text-gray-900">
            {products.length.toLocaleString("bn-BD")}
          </span>{" "}
          টি পণ্য দেখানো হচ্ছে
        </p>

        <label className="flex items-center gap-3 text-sm text-gray-600">
          <span className="shrink-0">সাজান</span>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="min-w-40 cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
          </select>
        </label>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product, index) => {
          const name = getProductName(product);
          const price = getProductPrice(product);
          const unit = getProductUnit(product);
          const change = getPriceChange(product);

          const key =
            product._id ||
            product.id ||
            product.slug ||
            `${slug}-${index}`;

          const direction = change?.direction || "";

          const isUp = [
            "up",
            "increase",
            "increased",
          ].includes(direction);

          const isDown = [
            "down",
            "decrease",
            "decreased",
          ].includes(direction);

          const productIcon = getIndividualProductIcon(
            product,
            categoryName,
            slug
          );

          return (
            <article
              key={key}
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-md sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f0f7e9] text-3xl">
                  {productIcon}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="break-words text-base font-bold leading-7 text-gray-900">
                    {name}
                  </h2>

                  <p className="mt-0.5 text-sm text-gray-500">
                    প্রতি {unit}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">
                  আজকের দাম
                </p>

                <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="break-words text-xl font-extrabold tracking-tight text-green-700 sm:text-2xl">
                    {price !== null
                      ? `${formatPrice(price)} ৳`
                      : "দাম পাওয়া যায়নি"}
                  </p>

                  {change && (
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isUp
                          ? "bg-red-50 text-red-600"
                          : isDown
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isUp ? "↑ " : isDown ? "↓ " : ""}
                      {change.text}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


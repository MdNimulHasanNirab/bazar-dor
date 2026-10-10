
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, TrendingUp } from "lucide-react";

import { getProduct } from "@/lib/products";
import { bnNumber, unitLabel } from "@/lib/format";
import { ChangeBadge } from "@/components/product-card";

function getNumber(...values) {
  for (const value of values) {
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      Number.isFinite(Number(value))
    ) {
      return Number(value);
    }
  }

  return null;
}

export default async function ProductDetails({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const name =
    product.nameBn ||
    product.name_bn ||
    product.name ||
    product.title ||
    "পণ্যের নাম";

  const category =
    product.categoryNameBn ||
    product.category_name_bn ||
    product.category ||
    "পণ্য";

  const categorySlug =
    product.categorySlug ||
    product.category_slug ||
    product.category ||
    "";

  const markets = Array.isArray(product.markets)
    ? product.markets.filter((market) => market)
    : [];

  const marketRows = markets.map((market) => ({
    market:
      market.market ||
      market.marketName ||
      market.market_name ||
      market.name ||
      "বাজারের নাম নেই",
    division:
      market.division ||
      market.district ||
      market.location ||
      "—",
    min: getNumber(market.min, market.minPrice, market.min_price),
    max: getNumber(market.max, market.maxPrice, market.max_price),
  }));

  const validMins = marketRows
    .map((market) => market.min)
    .filter((value) => value !== null);

  const validMaxs = marketRows
    .map((market) => market.max)
    .filter((value) => value !== null);

  const minPrice = validMins.length
    ? Math.min(...validMins)
    : null;

  const maxPrice = validMaxs.length
    ? Math.max(...validMaxs)
    : null;

  const averages = marketRows
    .filter((market) => market.min !== null && market.max !== null)
    .map((market) => (market.min + market.max) / 2);

  const averagePrice = averages.length
    ? Math.round(
        averages.reduce((sum, value) => sum + value, 0) /
          averages.length
      )
    : getNumber(product.today, product.price, product.currentPrice);

  const todayPrice = getNumber(
    product.today,
    product.price,
    product.currentPrice,
    product.current_price
  );

  const changeDirection = product.change?.dir || "same";
  const shortUnit = unitLabel(product.unit || "kg").replace("প্রতি ", "");

  return (
    <main className="container section detail-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">হোম</Link>
        <span>›</span>

        {categorySlug ? (
          <Link href={`/category/${encodeURIComponent(categorySlug)}`}>
            {category}
          </Link>
        ) : (
          <span>{category}</span>
        )}

        <span>›</span>
        <span aria-current="page">{name}</span>
      </nav>

      <section className="detail-hero">
        <div className="detail-emoji">{product.image || "🛒"}</div>

        <div>
          <span className="tag">{product.categoryIcon || "🛒"} {category}</span>
          <h1>{name}</h1>

          <p>
            বাজারভিত্তিক বিস্তারিত তথ্য নিচে দেখুন।
          </p>

          <div className="detail-meta">
            <span>{unitLabel(product.unit || "kg")}</span>
            <ChangeBadge product={product} />
          </div>
        </div>

        <div className={`detail-today ${changeDirection}`}>
          <span>আজকের দাম</span>
          <strong>
            {todayPrice === null
              ? "—"
              : bnNumber(todayPrice)}
          </strong>
          <small>টাকা / {shortUnit}</small>
          <ChangeBadge product={product} />
        </div>
      </section>

      <section className="summary">
        <article className="summary-min">
          <small>সর্বনিম্ন দাম</small>
          <strong>
            {minPrice === null
              ? "—"
              : `${bnNumber(minPrice)} টাকা`}
          </strong>
          <span>সবচেয়ে কম দামের বাজার</span>
        </article>

        <article className="summary-max">
          <small>সর্বাধিক দাম</small>
          <strong>
            {maxPrice === null
              ? "—"
              : `${bnNumber(maxPrice)} টাকা`}
          </strong>
          <span>সবচেয়ে বেশি দামের বাজার</span>
        </article>

        <article className="featured">
          <small>গড় দাম</small>
          <strong>
            {averagePrice === null
              ? "—"
              : `${bnNumber(averagePrice)} টাকা`}
          </strong>
          <span>
            <TrendingUp size={15} /> বাজারের গড় দাম
          </span>
        </article>
      </section>

      <section className="market-section">
        <div className="section-heading">
          <div>
            <span className="kicker">⚖️ বাজার তুলনা</span>
            <h2>বাজারভিত্তিক আজকের দাম</h2>
          </div>
        </div>

        {marketRows.length === 0 ? (
          <p>
            এই পণ্যের জন্য API-তে বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="market-table">
            <div className="market-head">
              <span>বাজার</span>
              <span>বিভাগ</span>
              <span>সর্বনিম্ন</span>
              <span>সর্বাধিক</span>
              <span>গড়</span>
            </div>

            {marketRows.map((market, index) => {
              const rowAverage =
                market.min !== null && market.max !== null
                  ? Math.round((market.min + market.max) / 2)
                  : null;

              return (
                <div
                  className="market-row"
                  key={`${market.market}-${index}`}
                >
                  <b data-label="বাজার">
                    <MapPin size={16} />
                    {market.market}
                  </b>

                  <span data-label="বিভাগ">
                    {market.division}
                  </span>

                  <span data-label="সর্বনিম্ন">
                    {market.min === null
                      ? "—"
                      : `${bnNumber(market.min)} টাকা`}
                  </span>

                  <strong data-label="সর্বাধিক">
                    {market.max === null
                      ? "—"
                      : `${bnNumber(market.max)} টাকা`}
                  </strong>

                  <span data-label="গড়">
                    {rowAverage === null
                      ? "—"
                      : `${bnNumber(rowAverage)} টাকা`}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

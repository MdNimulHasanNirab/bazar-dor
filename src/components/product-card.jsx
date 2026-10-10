
import Link from "next/link";
import { bnNumber, unitLabel } from "@/lib/format";

export function ChangeBadge({ product }) {
  const change = product?.change;

  if (
    !change ||
    !Number.isFinite(Number(change.pct))
  ) {
    return null;
  }

  const direction = ["up", "down"].includes(change.dir)
    ? change.dir
    : "same";

  return (
    <span className={`badge ${direction}`}>
      {direction === "up"
        ? "▲"
        : direction === "down"
          ? "▼"
          : "•"}{" "}
      {bnNumber(Math.abs(Number(change.pct)))}%
    </span>
  );
}

export function ProductCard({ product }) {
  if (!product) return null;

  const name =
    product.nameBn ||
    product.name_bn ||
    product.name ||
    product.title ||
    "পণ্যের নাম";

  const identifier =
    product.slug ?? product.id ?? product._id;

  const image = product.image || "🛒";

  const category =
    product.categoryNameBn ||
    product.category_name_bn ||
    product.category ||
    "পণ্য";

  const price =
    product.today ??
    product.price ??
    product.currentPrice ??
    product.current_price;

  const content = (
    <>
      <div className="product-emoji">{image}</div>

      <div>
        <span className="category-label">{category}</span>
        <h3>{name}</h3>
        <p className="muted">
          {unitLabel(product.unit || "kg")}
        </p>
      </div>

      <div className="price-line">
        <div>
          <small>আজকের দাম</small>
          <strong>
            {price == null
              ? "দাম পাওয়া যায়নি"
              : `${bnNumber(price)} টাকা`}
          </strong>
        </div>

        <ChangeBadge product={product} />
      </div>

      <span className="details-button">
        বিস্তারিত দেখুন →
      </span>
    </>
  );

  if (identifier == null || identifier === "") {
    return <article className="product-card">{content}</article>;
  }

  return (
    <Link
      className="product-card"
      href={`/product/${encodeURIComponent(String(identifier))}`}
    >
      {content}
    </Link>
  );
}

export function ProductGrid({ products = [] }) {
  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return <p>কোনো পণ্য পাওয়া যায়নি।</p>;
  }

  return (
    <div className="product-grid">
      {safeProducts.map((product, index) => (
        <ProductCard
          key={
            product?.id ??
            product?._id ??
            product?.slug ??
            index
          }
          product={product}
        />
      ))}
    </div>
  );
}

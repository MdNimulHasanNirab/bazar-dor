
import Image from "next/image";
import Link from "next/link";
import {
  formatPrice,
  getProductId,
  getProductImage,
  getProductName,
  getProductPrice,
} from "../lib/utils";

export default function ProductCard({ product }) {
  const id = getProductId(product);
  const name = getProductName(product);
  const image = getProductImage(product);
  const price = getProductPrice(product);

  return (
    <article className="product-card">
      <Link
        href={`/product/${encodeURIComponent(String(id))}`}
        className="product-image-wrap"
        aria-label={`${name} এর বিস্তারিত`}
      >
        <Image
          src={image}
          alt={name}
          width={300}
          height={240}
          className="product-image"
          unoptimized
        />
        <span className="product-badge">তাজা পণ্য</span>
      </Link>

      <div className="product-info">
        <h3>
          <Link
            href={`/product/${encodeURIComponent(String(id))}`}
          >
            {name}
          </Link>
        </h3>

        <p className="product-description">
          {product?.descriptionBn ||
            product?.description ||
            "আপনার প্রতিদিনের বাজারের জন্য প্রয়োজনীয় পণ্য।"}
        </p>

        <div className="product-card-bottom">
          <strong className="product-price">
            {price == null ? "দাম দেখুন" : formatPrice(price)}
          </strong>

          <Link
            className="small-button"
            href={`/product/${encodeURIComponent(String(id))}`}
          >
            বিস্তারিত <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
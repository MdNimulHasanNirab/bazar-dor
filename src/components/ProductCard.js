import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }) {
  const id = product.slug ?? product.id;
  const name = product.name ?? product.title ?? "পণ্য";
  const price = Number(
    product.price ?? product.currentPrice ?? product.current_price ?? 0
  );
  const unit = product.unit ?? product.unitName ?? "প্রতি কেজি";
  const change = Number(
    product.changePercentage ?? product.change ?? 0
  );

  const changeClass =
    change > 0
      ? "price-up"
      : change < 0
        ? "price-down"
        : "price-flat";

  return (
    <Link
      href={`/product/${encodeURIComponent(id)}`}
      className="group rounded-2xl border border-[var(--border)] bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f3f8f3] text-4xl">
          {product.emoji ?? "🛒"}
        </div>

        <span className={`rounded-full px-2 py-1 text-xs font-bold ${changeClass}`}>
          {change > 0 ? "▲" : change < 0 ? "▼" : "—"}{" "}
          {Math.abs(change).toLocaleString("bn-BD")}%
        </span>
      </div>

      <h3 className="mt-4 text-base font-bold group-hover:text-[var(--green)]">
        {name}
      </h3>

      <p className="mt-1 text-xs text-gray-500">{unit}</p>

      <div className="mt-4 flex items-end justify-between gap-2 border-t border-gray-100 pt-3">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-base font-extrabold text-[var(--green)]">
            {formatPrice(price)}
          </p>
        </div>

        <span className="text-lg text-gray-400">→</span>
      </div>
    </Link>
  );
}
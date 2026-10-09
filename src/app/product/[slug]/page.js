import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  let product;

  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  if (!product || product.error || product.success === false) {
    notFound();
  }

  const name = product.name ?? product.title ?? "পণ্য";
  const price = Number(
    product.price ?? product.currentPrice ?? product.current_price ?? 0
  );

  const minPrice = Number(product.minPrice ?? product.min_price ?? price);
  const maxPrice = Number(product.maxPrice ?? product.max_price ?? price);
  const avgPrice = Number(product.avgPrice ?? product.average_price ?? price);

  const markets =
    product.markets ?? product.bazars ?? product.marketPrices ?? [];

  return (
    <section className="container-main min-h-[65vh] py-9">
      <Link href="/" className="text-sm text-gray-500 hover:text-green-700">
        ← হোম পেজে ফিরে যান
      </Link>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-6xl">
            {product.emoji ?? "🛒"}
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {product.categoryName ?? product.category ?? "নিত্যপ্রয়োজনীয়"}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                {product.unit ?? "প্রতি কেজি"}
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              {name}
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {product.description ?? `${name} এর বর্তমান বাজারদর ও বিভিন্ন বাজারের দাম দেখুন।`}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: "সর্বনিম্ন দাম", value: minPrice },
            { label: "সর্বোচ্চ দাম", value: maxPrice },
            { label: "গড় দাম", value: avgPrice },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-gray-100 bg-gray-50 p-5"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="mt-2 text-xl font-extrabold text-[var(--green)]">
                {formatPrice(item.value)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
          <p className="mt-1 text-sm text-gray-500">
            বিভিন্ন বাজারে এই পণ্যের দামের তুলনা
          </p>

          {markets.length ? (
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">বাজার</th>
                    <th className="px-4 py-3 font-semibold">আজকের দাম</th>
                    <th className="px-4 py-3 font-semibold">পরিবর্তন</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={market.id ?? index}
                      className="border-t border-gray-100"
                    >
                      <td className="px-4 py-4">
                        {market.name ?? market.marketName ?? market.bazar ?? "স্থানীয় বাজার"}
                      </td>
                      <td className="px-4 py-4 font-bold text-green-700">
                        {formatPrice(market.price ?? market.currentPrice ?? 0)}
                      </td>
                      <td className="px-4 py-4">
                        {market.changePercentage ?? market.change ?? "—"}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
              এই পণ্যের জন্য আলাদা বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
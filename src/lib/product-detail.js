
export function productSlug(product) {
  const id =
    product?.slug ||
    product?.id ||
    product?._id ||
    product?.productId ||
    product?.product_id;

  if (id != null && String(id).trim()) {
    return encodeURIComponent(String(id).trim());
  }

  const name =
    product?.nameBn ||
    product?.name_bn ||
    product?.name ||
    product?.title ||
    "product";

  return encodeURIComponent(
    String(name)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\p{L}\p{N}_-]/gu, "")
  );
}

export function productName(product) {
  return (
    product?.nameBn ||
    product?.name_bn ||
    product?.name ||
    product?.title ||
    "নাম পাওয়া যায়নি"
  );
}

export function productPrice(product) {
  const values = [
    product?.today,
    product?.price,
    product?.currentPrice,
    product?.current_price,
    product?.pricePerKg,
    product?.price_per_kg,
    product?.minPrice,
  ];

  const price = values.find(
    (value) =>
      value !== null &&
      value !== undefined &&
      value !== "" &&
      Number.isFinite(Number(value))
  );

  return price === undefined ? null : Number(price);
}
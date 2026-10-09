
export function formatPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price)) {
    return "দাম জানতে যোগাযোগ করুন";
  }

  return `৳${price.toLocaleString("en-BD")}`;
}

export function getProductId(product) {
  return product?.id ?? product?._id ?? product?.slug;
}

export function getProductName(product) {
  return (
    product?.nameBn ||
    product?.name ||
    product?.title ||
    "নাম দেওয়া হয়নি"
  );
}

export function getProductImage(product) {
  return (
    product?.image ||
    product?.imageUrl ||
    product?.thumbnail ||
    "/images/hero.png"
  );
}

export function getProductPrice(product) {
  return (
    product?.price ??
    product?.sellingPrice ??
    product?.salePrice ??
    null
  );
}

export function getCategoryName(category) {
  return category?.nameBn || category?.name || "অন্যান্য";
}
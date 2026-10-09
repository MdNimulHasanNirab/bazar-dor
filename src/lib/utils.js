const bengaliDigits = "০১২৩৪৫৬৭৮৯";

export function toBengaliNumber(value) {
  return String(value).replace(/\d/g, (digit) => {
    return bengaliDigits[Number(digit)];
  });
}

export function formatPrice(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return `${Number(value).toLocaleString("en-US").replace(/\d/g, (d) => bengaliDigits[Number(d)])} টাকা`;
}

export function sortProducts(products, sortOrder) {
  const result = [...products];

  if (sortOrder === "low") {
    return result.sort(
      (a, b) => Number(a.price ?? a.currentPrice ?? 0) -
        Number(b.price ?? b.currentPrice ?? 0)
    );
  }

  if (sortOrder === "high") {
    return result.sort(
      (a, b) => Number(b.price ?? b.currentPrice ?? 0) -
        Number(a.price ?? a.currentPrice ?? 0)
    );
  }

  return result;
}
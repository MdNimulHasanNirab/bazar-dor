export const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

// Convert numbers/strings to Bengali numerals
export function toBengaliNumerals(num) {
  if (num === null || num === undefined) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

// Format currency in Bengali (e.g., 1480 -> ১,৪৮০ টাকা)
export function formatBengaliPrice(price) {
  if (typeof price !== "number" && !price) return "০ টাকা";
  const numStr = Math.round(Number(price)).toLocaleString("en-US");
  return `${toBengaliNumerals(numStr)} টাকা`;
}

// Fetch helper with caching controls
export async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return null;
  }
}
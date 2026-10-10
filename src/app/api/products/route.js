
import { NextResponse } from "next/server";

const API_URLS = [
  "https://api.api-store.workers.dev/api/bazardor/products",
  "https://api.abcz.workers.dev/api/bazardor/products",
];

export async function GET() {
  const errors = [];

  for (const url of API_URLS) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
      });

      if (!response.ok) {
        errors.push(`${url}: HTTP ${response.status}`);
        continue;
      }

      const result = await response.json();

      const products = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result?.products)
            ? result.products
            : null;

      if (!products) {
        errors.push(`${url}: Response does not contain a product array`);
        continue;
      }

      return NextResponse.json(products);
    } catch (error) {
      errors.push(
        `${url}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  console.error("BazarDor API failures:", errors);

  return NextResponse.json(
    {
      error: "Unable to load products",
      details: errors,
    },
    { status: 502 }
  );
}

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request(path) {
  for (const baseUrl of BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
      });

      if (!response.ok) continue;

      const result = await response.json();
      return result.data ?? result;
    } catch {
      // Try the alternative API.
    }
  }

  throw new Error("বাজারের তথ্য লোড করা যায়নি।");
}

export async function getProducts() {
  const result = await request("/products");
  return Array.isArray(result) ? result : result.products ?? [];
}

export async function getCategories() {
  const result = await request("/categories");
  return Array.isArray(result) ? result : result.categories ?? [];
}

export async function getProduct(slug) {
  return request(`/products/${encodeURIComponent(slug)}`);
}

export async function getCategoryProducts(slug) {
  const result = await request(
    `/products?category=${encodeURIComponent(slug)}`
  );

  return Array.isArray(result) ? result : result.products ?? [];
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.api-store.workers.dev/api/bazardor";

async function request(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export async function getCategories() {
  const data = await request("/categories");
  return Array.isArray(data) ? data : data.categories || [];
}

export async function getCategory(slug) {
  return request(`/categories/${encodeURIComponent(slug)}`);
}

export async function getProducts(category) {
  const query = category
    ? `?category=${encodeURIComponent(category)}`
    : "";

  const data = await request(`/products${query}`);
  return Array.isArray(data) ? data : data.products || [];
}

export async function getProduct(id) {
  return request(`/products/${encodeURIComponent(id)}`);
}
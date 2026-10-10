
const API_BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchApi(path) {
  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
      });

      // A missing endpoint can be normal when trying a fallback.
      if (!response.ok) {
        console.warn(
          `API returned ${response.status}: ${path}`
        );
        continue;
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", path, error);
    }
  }

  return null;
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function makeSlug(value) {
  return normalize(value)
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}_-]/gu, "");
}

function extractProducts(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.products)) return result.products;
  if (Array.isArray(result?.data?.products)) {
    return result.data.products;
  }
  if (Array.isArray(result?.data)) return result.data;

  if (
    result?.product &&
    typeof result.product === "object"
  ) {
    return [result.product];
  }

  if (
    result?.data?.product &&
    typeof result.data.product === "object"
  ) {
    return [result.data.product];
  }

  return [];
}

function extractCategories(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.categories)) {
    return result.categories;
  }
  if (Array.isArray(result?.data?.categories)) {
    return result.data.categories;
  }
  if (Array.isArray(result?.data)) return result.data;

  return [];
}

function unwrapProduct(result) {
  if (!result || typeof result !== "object") return null;

  const product =
    result.product ??
    result.data?.product ??
    result.data ??
    result;

  if (Array.isArray(product) || !product || typeof product !== "object") {
    return null;
  }

  return product;
}

function matchesProduct(product, requested) {
  const identifiers = [
    product?.id,
    product?._id,
    product?.slug,
    product?.productId,
    product?.product_id,
    product?.name,
    product?.nameBn,
    product?.name_bn,
    product?.title,
  ];

  return identifiers.some((value) => {
    if (value === null || value === undefined) return false;

    return (
      normalize(value) === requested ||
      makeSlug(value) === requested
    );
  });
}

export async function getProducts() {
  const result = await fetchApi("/products");
  return extractProducts(result);
}

export async function getProduct(identifier) {
  const requested = normalize(identifier);

  if (!requested) return null;

  // The API's single-product endpoint is intended for IDs.
  // Do not request /products/sorno-machi-chal.
  if (/^\d+$/.test(requested)) {
    const result = await fetchApi(
      `/products/${encodeURIComponent(requested)}`
    );

    const product = unwrapProduct(result);

    if (product) return product;
  }

  // Search the complete list for a matching ID, slug or name.
  const products = await getProducts();

  const matchedProduct = products.find((product) =>
    matchesProduct(product, requested)
  );

  if (matchedProduct) return matchedProduct;

  console.warn("Product not found:", requested);
  return null;
}

export async function getCategory(slug) {
  const requested = normalize(slug);

  const [categoryResult, productResult] = await Promise.all([
    fetchApi("/categories"),
    fetchApi(
      `/products?category=${encodeURIComponent(requested)}`
    ),
  ]);

  const categories = extractCategories(categoryResult);

  const category = categories.find((item) => {
    const values = [
      item?.slug,
      item?.id,
      item?.category,
      item?.name,
      item?.nameBn,
      item?.name_bn,
    ];

    return values.some(
      (value) =>
        value != null &&
        (
          normalize(value) === requested ||
          makeSlug(value) === requested
        )
    );
  });

  return {
    category: category ?? {
      slug: requested,
      name: requested,
    },
    products: extractProducts(productResult),
  };
}

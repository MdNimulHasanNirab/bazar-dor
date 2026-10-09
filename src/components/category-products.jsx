"use client";

export default function CategoryProducts({ products }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id || product._id} className="product-card">
          <h3>{product.nameBn || product.name}</h3>
          <p>{product.price} টাকা</p>
        </div>
      ))}
    </div>
  );
}
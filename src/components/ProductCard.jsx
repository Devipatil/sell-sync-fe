import React, { useState } from "react";

/**
 * Props:
 *   product       { id, name, price, description, photo }
 *   onAddToCart   fn(product, qty)
 */
export default function ProductCard({ product, onAddToCart }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => Math.max(1, q - 1));

  return (
    <article className="product-card">
      <figure className="product-img-wrap">
        <img
          src={product.photo || "/placeholder.png"}
          alt={product.name}
          loading="lazy"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />
      </figure>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        <p className="product-desc">{product.description}</p>

        <div className="qty-control">
          <button onClick={dec} aria-label="decrease quantity">−</button>
          <span>{qty}</span>
          <button onClick={inc} aria-label="increase quantity">+</button>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => onAddToCart(product, qty)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
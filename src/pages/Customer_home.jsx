import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Customer_home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [search, setSearch]     = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/getAllProducts");
        if (!res.ok) throw new Error("Failed to fetch products");
        setProducts(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAddToCart(product, qty = 1) {
    const username = localStorage.getItem("username");
    if (!username) return alert("Please sign in first");

    try {
      const resp = await fetch("http://localhost:8080/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, username, quantity: qty })
      });

      resp.ok
        ? alert(`Added “${product.name}” (x${qty}) to cart`)
        : alert("Could not add to cart");
    } catch (err) {
      console.error(err);
      alert("Could not add to cart");
    }
  }

  const filtered = products.filter((p) =>
    (p.name + p.description)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="customer-home">
      <header className="shop-header">
        <h1 className="shop-title">Welcome to Sales Savvy</h1>
        <p className="shop-tagline">
          Discover curated deals, fresh arrivals and lightning-fast delivery.
          Scroll down to start shopping!
        </p>

        <button
          className="btn btn-primary go-to-cart"
          onClick={() => navigate("/cart")}
        >
          Go to Cart 🛒
        </button>

        {/*
        <input
          className="shop-search"
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        */}
      </header>

      <div className="container">
        {loading && <p className="text-center">Loading…</p>}
        {error   && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && (
          filtered.length ? (
            <div className="products-grid">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">No products match your search.</p>
          )
        )}
      </div>
    </section>
  );
}
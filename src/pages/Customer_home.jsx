import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import "../styles/Custhome.css";

export default function Customer_home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

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

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  async function handleAddToCart(product, qty = 1) {
    const username = localStorage.getItem("username");
    if (!username) return alert("Please sign in first");

    try {
      const resp = await fetch("http://localhost:8080/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, username, quantity: qty }),
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
    (p.name + p.description + p.category)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const currentProducts = filtered.slice(start, start + productsPerPage);

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand" onClick={() => navigate("/customer_home")}>
          🛍️ Sales Savvy
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate("/customer_home")}>Home</li>
          <li onClick={() => navigate("/cart")}>Cart</li>
          <li onClick={() => navigate("/orders")}>Orders</li>
          <li
            onClick={() => {
              localStorage.clear();
              navigate("/", { replace: true });
            }}
          >
            Logout
          </li>
        </ul>
      </nav>

      <section className="customer-home">
        <div className="flipkart-style-search">
          <div className="logo" onClick={() => navigate("/customer_home")}>
            🛍️ Sell Sync
          </div>
          <input
            type="text"
            className="flipkart-search-input"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="flipkart-search-btn"
            onClick={() => {
              setSearchQuery(search.trim());
              setCurrentPage(1); // reset to page 1
            }}
          >
            🔍
          </button>
          <button className="btn go-to-cart" onClick={() => navigate("/cart")}>
            Cart 🛒
          </button>
        </div>

        <header className="shop-header">
          <h1 className="shop-title">Welcome to Sell Sync</h1>
          <p className="shop-tagline">
            Discover curated deals, fresh arrivals and lightning-fast delivery.
            Scroll down to start shopping!
          </p>
        </header>

        <div className="container">
          {loading && <p className="text-center">Loading…</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          {!loading && !error && (
            currentProducts.length ? (
              <>
                <div className="products-grid">
                  {currentProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={i + 1 === currentPage ? "active" : ""}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center">No products match your search.</p>
            )
          )}
        </div>
      </section>
    </>
  );
}
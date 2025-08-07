import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Orders.css";

// ⭐ StarRating Component
const StarRating = ({ rating, onRate }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#f5b301" : "#ccc",
            fontSize: "20px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// 📦 Horizontal Order Progress Tracker
const OrderTracker = ({ status }) => {
  const steps = ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"];
  const currentIndex = steps.indexOf(status.toUpperCase());

  return (
    <div className="order-status-tracker">
      {steps.map((step, index) => (
        <div className="order-step" key={step}>
          <div className={`step-dot ${index <= currentIndex ? "active" : ""}`} />
          <div className="step-label">{step}</div>
          {index < steps.length - 1 && (
            <div className={`step-line ${index < currentIndex ? "active" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [productRatings, setProductRatings] = useState({});
  const [ratedProductIds, setRatedProductIds] = useState(new Set());
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) return;

    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/getOrders/${username}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();

        const sortedOrders = data
          .filter((order) => order && order.status !== "CREATED")
          .sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
        setOrders(sortedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  const handleReturn = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:8080/requestReturn/${orderId}`, {
        method: "PUT",
      });
      alert(await res.text());
      window.location.reload();
    } catch {
      alert("Return request failed");
    }
  };

  const isReturnEligible = (order) =>
    order.status.toUpperCase() === "DELIVERED";

  const rateProduct = async (productId, rating) => {
    if (ratedProductIds.has(productId)) return;
    try {
      const res = await fetch(`http://localhost:8080/products/${productId}/rate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      alert(await res.text());
      setRatedProductIds((prev) => new Set(prev).add(productId));
    } catch {
      alert("Failed to submit rating");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand" onClick={() => navigate("/")}>
          🛍️ Sell Sync
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

      <div className="orders-container">
        <h2>Your Orders</h2>

        {loading && <p className="text-center">Loading…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && orders.length === 0 && (
          <p>No paid or delivered orders yet.</p>
        )}

        {!loading && orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <h3>Order ID: {order.id}</h3>
                <OrderTracker status={order.status} />

                <p><strong>Placed On:</strong> {new Date(order.orderTime).toLocaleString()}</p>
                {order.deliveryTime && (
                  <p><strong>Delivered On:</strong> {new Date(order.deliveryTime).toLocaleString()}</p>
                )}
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ₹{order.amount / 100}</p>
                <p><strong>Payment ID:</strong> {order.paymentId || "—"}</p>

                <h4>Items:</h4>
                <ul className="items-list">
                  {order.items?.map((item, index) => (
                    <li key={index} className="item-card">
                      <img
                        src={item.product?.photo}
                        alt={item.product?.name}
                        className="product-img"
                      />
                      <div className="item-details">
                        <h5>{item.product?.name || "Unknown Product"}</h5>
                        <p>Qty: {item.quantity}</p>
                        <p>Price: ₹{item.product?.price || 0}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {order.status.toUpperCase() === "DELIVERED" && (
                  <>
                    <h4>Rate Products:</h4>
                    <ul className="items-list">
                      {order.items?.map((item, idx) => {
                        const product = item.product;
                        if (!product) return null;

                        return (
                          <li key={idx} className="item-card">
                            <img
                              src={product.photo}
                              alt={product.name}
                              className="product-img"
                            />
                            <div className="item-details">
                              <h5>{product.name}</h5>
                              <p>Price: ₹{product.price}</p>
                              <StarRating
                                rating={productRatings[product.id] || 0}
                                onRate={(star) => {
                                  setProductRatings((prev) => ({
                                    ...prev,
                                    [product.id]: star,
                                  }));
                                  rateProduct(product.id, star);
                                }}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                {isReturnEligible(order) && (
                  <button
                    className="return-btn"
                    onClick={() => handleReturn(order.id)}
                  >
                    Request Return
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
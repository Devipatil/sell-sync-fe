import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/OrderSummary.css";
import html2pdf from "html2pdf.js";

export default function OrderSummary() {
  const { orderId } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const invoiceRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`http://localhost:8080/order/summary/${orderId}`);
        if (!r.ok) throw new Error("Unable to fetch order");
        const json = await r.json();
        if (json.error) throw new Error("Order not found");
        setData(json);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [orderId]);

  const handleDownload = () => {
    const opt = {
      margin: 0.5,
      filename: `SalesSavvy_Order_${orderId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(invoiceRef.current).save();
  };

  if (err) return <p className="error-message">{err}</p>;
  if (!data) return <p className="loading-message">Loading…</p>;

  return (
    <div className="order-summary-container">
      <div ref={invoiceRef}>
        <div className="bill-header">
          <h2>🧾 SellSync - Order Invoice</h2>
          <p><b>Order ID:</b> {data.orderId}</p>
          <p><b>Status:</b> {data.status}</p>
          <p><b>Date:</b> {new Date().toLocaleString()}</p>
        </div>

        <div className="bill-table-wrapper">
          <table className="bill-table">
            <thead>
              <tr><th>S.No.</th><th>Name</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
              {data.items.map((it, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{it.name}</td>
                  <td>{it.qty}</td>
                  <td>₹{it.price}</td>
                  <td>₹{it.qty * it.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bill-total">
          <h3>Total Paid: ₹{data.total}</h3>
        </div>

        <div className="bill-footer">
          <p>Thank you for shopping with SellSync! 😊</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="continue-shopping-btn" onClick={handleDownload}>
          Download Invoice (PDF)
        </button>
        &nbsp;
        <Link to="/customer_home" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
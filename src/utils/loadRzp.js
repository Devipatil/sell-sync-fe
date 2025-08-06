/**
 * Dynamically loads Razorpay’s checkout.js exactly once.
 * Returns a Promise that resolves `true` if the script is ready,
 * or `false` if it failed to load.
 */
export default function loadRazorpay() {
    return new Promise((resolve) => {
      // already present?
      if (window.Razorpay) {
        resolve(true);
        return;
      }
  
      // inject <script>
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }
  
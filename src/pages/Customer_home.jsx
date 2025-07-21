import React, { useEffect, useState } from 'react';

export default function Customer_home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:8080/getAllProducts')
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setProducts(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
  },  []);

    return (
        <div className="customer-home">
            <h2>Welcome to your Dashboard</h2>
            <h3>Available Products</h3>
            <div className="product-list"> 
              {products.length > 0 ? (
                products.map(product => (
                    <div key={product.id} className="product-card">
                      <h3>{product.name}</h3>
                      <p>Category: {product.category}</p>
                      <p>Prie: ₹{product.price}</p>
                      <p>Description: {product.description}</p>                     
            </div>
                ))
              ) : (
                <p>No products available</p>
              )}  
           </div>     
        </div>
    );
}

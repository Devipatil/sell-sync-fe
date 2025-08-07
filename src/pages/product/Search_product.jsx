import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/SearchProduct.css';

export default function Search_product() {
  const [id, setId] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/searchProduct?id=${id}`);
      setProduct(res.data);
      setError('');
    } catch (err) {
      setProduct(null);
      setError("Product not found");
    }
  };

  return (
    <div className="search-container">
      <h2>Search Product by ID</h2>
      <div className="search-form">
        <input
          type="number"
          placeholder="Enter Product ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {product && (
        <div className="product-card">
          <img src={product.photo} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
}
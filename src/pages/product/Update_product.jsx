import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/UpdateProduct.css"

export default function Update_product() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/getAllProducts")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  const handleChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.post("http://localhost:8080/updateProduct", editProduct)
      .then(res => {
        alert(res.data);
        setEditProduct(null);
        window.location.reload();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="update-page">
      <h2 className="section-heading">Update Products</h2>

      {editProduct ? (
        <div className="update-form">
          <h3>Editing Product ID: {editProduct.id}</h3>
          <input type="text" name="name" value={editProduct.name} onChange={handleChange} placeholder="Name" />
          <input type="text" name="brand" value={editProduct.brand} onChange={handleChange} placeholder="Brand" />
          <input type="text" name="category" value={editProduct.category} onChange={handleChange} placeholder="Category" />
          <input type="text" name="price" value={editProduct.price} onChange={handleChange} placeholder="Price" />
          <input type="text" name="photo" value={editProduct.photo} onChange={handleChange} placeholder="Photo URL" />
          <button onClick={handleUpdate}>Submit Update</button>
          <button onClick={() => setEditProduct(null)}>Cancel</button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((prod) => (
            <div key={prod.id} className="product-card">
              <img className="product-image"  src={prod.photo} alt={prod.name} />
              <div className="product-info">
                <h4>#{prod.id} - {prod.name}</h4>
                <button onClick={() => handleEditClick(prod)}>Update</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
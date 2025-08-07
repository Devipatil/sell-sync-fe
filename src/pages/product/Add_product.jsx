import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Add_product() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name,
      description,
      price,
      photo,
      category
    };

    try {
      const resp = await fetch('http://localhost:8080/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const msg = await resp.text();
      alert(msg);
      
      if (msg === "product added successfully!") {
        navigate('/pm'); 
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit data");
    }
  }

  return (
    <>
      <h4>Add product below</h4>
      <form onSubmit={handleSubmit} >
      <div className="form-group">
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
        
        <div className="form-group">
        <label>Description: </label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label>Price: </label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label>Photo: </label>
        <input
          type="text"
          name="photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label>Category: </label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </>
  );
}
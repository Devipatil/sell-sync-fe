import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Add_product() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");
    const [reviews, setReviews] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
    e.preventDefault()

    const data= {
      name,
      description,
      price,
      photo,
      category,
      reviews
    };

    try {
      const resp = await fetch('http://localhost:8080/addProduct', {
      method : "POST",
      headers : {
        "content-Type": "application/json"
      },
      body : JSON.stringify(data)
    });

    const msg = await resp.text()
    alert(msg)

    if (msg === "Product added successfully!") {
      navigate('/pm')
    }
 } catch (error) {
      console.error('Error:', error)
      alert('Failed to send data')
    }
  }


  return (
    <div>
      <h4>Add product below</h4>
      <form onSubmit={handleSubmit}>
        <label>Name </label>
        <input type = "text" name = "name" value={name} onChange={(e) => setName(e.target.value)}></input>
        <br></br><br></br>
        <label>Description </label>
        <input type = "text" name ="description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
        <br></br><br></br>
        <label>Price </label>
        <input type = "text" name = "price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
        <br></br><br></br>
        <label>Photo</label>
        <input type ="text" name ="photo" value={photo} onChange={(e) => setPhoto(e.target.value)}></input>
        <br></br><br></br>
        <label>Category</label>
        <input type = "text" name ="category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
        <br></br><br></br>
        <label>Review </label>
        <textarea name = "reviews" rows="5" cols="30" value={reviews} onChange={(e) => setReviews(e.target.value)}></textarea>
        <br></br><br></br>
        <button type = "submit">Add Product</button>
      </form>
    </div>
  )
}

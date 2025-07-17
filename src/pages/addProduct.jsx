import { useState } from 'react'

export default function addProduct() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [photo, setPhoto] = useState("");
    const [category, setCategory] = useState("");
    const [review, setReview] = useState("");

    async function handleSubmit(e) {
    e.preventDefault()

    const data= {
      name,
      description,
      price,
      photo,
      category,
      review
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
    } 
    catch (error) {
      console.error('Error:', error)
      alert('Failed to send data')
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Product name </label>
        <input type = "text" name = "name" value={setName} onChange={(e) => {e.target.value}}></input>
        <br></br><br></br>
        <label>Description </label>
        <input type = "text" name ="description" value={setDescription} onChange={(e) => {e.target.value}}></input>
        <br></br><br></br>
        <label>Price </label>
        <input type = "text" name = "price" value={setPrice} onChange={(e) => {e.target.value}}></input>
        <br></br><br></br>
        <label>Photo</label>
        <input type ="image" name ="photo" value={setPhoto} onChange={(e) => {e.target.value}}></input>
        <br></br><br></br>
        <label>Category</label>
        <input type = "text" name ="category" value={setCategory} onChange={(e) => {e.target.value}}></input>
        <br></br><br></br>
        <label>Review </label>
        <input type = "text" name = "review" value={setReview} onChange={(e) => {e.target.value}}></input>
        <button type = "submit">SUBMIT</button>
      </form>
    </div>
  )
}

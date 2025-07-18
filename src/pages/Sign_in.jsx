
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Sign_in() {
     const [username, setUsername] = useState("")
     const [password, setPassword] = useState("")
     const navigate = useNavigate();

    async function handleSubmit(e) {
    e.preventDefault()

    const data = {
      username,
      password
    }

    try {
      const resp = await fetch('http://localhost:8080/signIn', {
        method : "POST",
        headers : {
          "content-Type": "application/json"
        },
        body : JSON.stringify(data)
      });
 
      const msg = await resp.text()
      alert(msg)
      
      if (msg === "admin" || msg === "customer") {
        localStorage.setItem("username", username); // Username is already known from input
        navigate(`/${msg}_home`);
      } else {
        alert(msg); // show error message like "wrong password"
      }
    } 
    catch (error) {
      console.error('Error:', error)
      alert('Failed to send data')
    }
  }

    return (
        <>
        <h4>Sign in below</h4>

        <form onSubmit = {handleSubmit}>
        <label>Username </label>
        <input type = "text" name = "username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <br></br><br></br>
        <label>Password </label>
        <input type = " password" name = "password" value = {password} onChange={(e) => setPassword(e.target.value)}></input>
        <br></br><br></br>
        <button type = "submit">SIGN IN</button>      
        </form>
        
        </>
    )
}
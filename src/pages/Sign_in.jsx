import { useState } from 'react'

export default function Sign_in() {
     const [username, setUsername] = useState("")
     const [password, setPassword] = useState("")

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
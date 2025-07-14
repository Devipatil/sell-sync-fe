import React from 'react'

export default function Sign_in() {
    return (
        <>
        <h4>Sign in below</h4>
        <form>
            <label>Username </label>
        <input type = "text" name = "username"></input>
       <br></br><br></br>
        <label>Password </label>
        <input type = " password" name = "password"></input>
        <br></br><br></br>
        <input type = "submit" value = "SIGN IN"></input>
        </form>
        
        </>
    )
}
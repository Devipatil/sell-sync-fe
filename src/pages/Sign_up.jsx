import React from 'react'

export default function Sign_up() {
  return (
    <>
    <h4>Sign up below</h4>
 <form>
        <label>Username </label>
        <input type = "text" name = "username"></input>
        <br></br><br></br>
        <label>Email </label>
        <input type = "email" name = "email"></input>
        <br></br><br></br>
        <label>Password </label>
        <input type = " password" name = "password"></input>
        <br></br><br></br>
        <label>Gender : </label>
        Male<input type = "radio" name = " gender" value = "M"></input>
        Female<input type = "radio" name = " gender" value = "F"></input>
        Other<input type = "radio" name = " gender" value = "O"></input>
       <br></br><br></br>
        <label>DOB </label>
        <input type = "date" name = "dob"></input>
        <br></br><br></br>
        <label>Mobile </label>
        <input type = "text" name = "mobile"></input>
       <br></br><br></br>
        <label>Role : </label>
        ADMIN<input type = "radio" name = "role" value = "admin"></input>
        CUSTOMER <input type = "radio" name = "role" value = "customer"></input>
       <br></br><br></br>
        <input type = "submit" value = "SIGN UP"></input>
</form>
        
    </>
  )
}

import React from 'react'

export default function  Welcome() {
    return (
        <>
        <h3>Welcome page</h3>
        <NavLink to={"/sign_up"}>Sign Up</NavLink>
        <br></br><br></br>
        <NavLink to={"/sign_in"}>Sign In</NavLink>
        </>
    )
}


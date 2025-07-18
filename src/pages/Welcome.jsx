import React from 'react'
import { NavLink } from 'react-router-dom'

export default function  Welcome() {
    return (
        <>
        <h4>Welcome page</h4>
        <NavLink to={'/sign_up'}>Sign Up</NavLink>
        <br></br><br></br>
        <NavLink to={'/sign_in'}>Sign In</NavLink>
        </>
    )
}


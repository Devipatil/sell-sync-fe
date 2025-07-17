import React from 'react'

export default function Product_Management() {
  return (
    <div>
      <NavLink to={"/add"}>Add product</NavLink>
      <NavLink to={"/seach"}>Search product</NavLink>
      <NavLink to={"/update"}>Update product</NavLink>
      <NavLink to={"/delete"}>Delete product</NavLink>
    </div>
  )
}

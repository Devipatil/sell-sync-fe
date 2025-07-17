import React from 'react'

export default function Admin_home() {
  return (
    <div>
      <NavLink to={"/um"}>User management</NavLink>
      <NavLink to={"/pm"}>Product management</NavLink>
    </div>
  )
}

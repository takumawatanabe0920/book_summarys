import React, { useRef } from "react"

const Navbar = () => {
  const el = useRef(null)

  const menuAnimation = () => {
    el.current.classList.toggle("open")
  }

  return (
    <nav>
      <div className="menu" onClick={() => menuAnimation()}>
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>

      <ul className="nav-links" ref={el}>
        <li onClick={() => menuAnimation()}>Home</li>
        <li onClick={() => menuAnimation()}>Projects</li>
        <li onClick={() => menuAnimation()}>About</li>
      </ul>
    </nav>
  )
}

export default Navbar

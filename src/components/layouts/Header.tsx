import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="l-header__container">
      <div className="l-header__top">
        <Link className="l-header__logo" to="/">
          BOOK SUMMARY
        </Link>
        <div className="l-header__right-box">
          <Link to="/signup">SIGN UP</Link>
          <Link to="/signin">SIGN IN</Link>
          <Link to="/mypage">MYPAGE</Link>
        </div>
      </div>
    </header>
  )
}

export default Header

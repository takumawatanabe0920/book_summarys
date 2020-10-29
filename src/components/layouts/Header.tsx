import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="l-header__container">
      <div className="l-header__top">
        <Link className="l-header__logo" to="/">
          BOOK SUMMARY
        </Link>
        <div className="l-header__right-box">
          <Link to="/summary/create">CREATE SUMMARY</Link>
          <Link to="/sign_up">SIGN UP</Link>
          <Link to="/mypage">MYPAGE</Link>
        </div>
      </div>
    </header>
  )
}

export default Header

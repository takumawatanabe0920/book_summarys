import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CurrentUser } from "../../types/user"
import functions from "../../utils/functions"
const { getCurrentUser } = functions

const Header = () => {
  const [CurrentUser, setCurrentUser] = useState<CurrentUser>({})

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!unmounted) {
        const user: CurrentUser = getCurrentUser()
        setCurrentUser(user)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])
  return (
    <header className="l-header__container">
      <div className="l-header__top">
        <Link className="l-header__logo" to="/">
          BOOK SUMMARY
        </Link>
        <div className="l-header__right-box">
          {CurrentUser && <Link to="/summary/create">CREATE SUMMARY</Link>}
          {CurrentUser && <Link to="/mypage">MYPAGE</Link>}
          {!CurrentUser && <Link to="/sign_up">SIGN UP</Link>}
        </div>
      </div>
    </header>
  )
}

export default Header

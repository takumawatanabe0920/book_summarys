import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CurrentUser } from "../../types"
import { getCurrentUser } from "../../firebase/functions"
import { logoIcon, editIcon, userCircleIcon, bellIcon } from "../../utils/icons"

const user: CurrentUser = getCurrentUser()

const Header = () => {
  const [CurrentUser, setCurrentUser] = useState<CurrentUser>(user)

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!unmounted) {
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
          <img src={logoIcon} alt="ロゴ" />
        </Link>
        <div className="l-header__right-box">
          {CurrentUser && (
            <Link to="/summary/create" className="l-header__sub-logo">
              <img src={editIcon} alt="ロゴ" />
            </Link>
          )}
          {CurrentUser && (
            <Link to="/notification" className="l-header__sub-logo">
              <span className="notification_count">2</span>
              <img src={bellIcon} alt="ロゴ" />
            </Link>
          )}
          {CurrentUser && (
            <Link to="/mypage" className="l-header__sub-logo">
              <img src={userCircleIcon} alt="ロゴ" />
            </Link>
          )}
          {!CurrentUser && <Link to="/sign_up">SIGN UP</Link>}
        </div>
      </div>
    </header>
  )
}

export default Header

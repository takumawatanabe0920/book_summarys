import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CurrentUser } from "./../../types/user"
import functions from "../../utils/functions"
const { getCurrentUser, logout } = functions

const Mypage = () => {
  const [CurrentUser, setCurrentUser] = useState<CurrentUser>({})

  const handleLogout = () => {
    if (window.confirm("ログインしますか？")) {
      logout()
    }
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const user: CurrentUser = getCurrentUser()
      if (!unmounted) {
        setCurrentUser(user)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="c-register">
        <div className="md-container">
          <div className="user-mypage">
            <h1 className="main-title blue-main-title">MY PAGE</h1>
            <p>{CurrentUser.displayName}</p>
            <p>{CurrentUser.email}</p>
            <button onClick={handleLogout}>ログアウト</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mypage
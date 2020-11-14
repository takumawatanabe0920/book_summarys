import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CurrentUser } from "../../types/user"
import { ResBrowsing } from "../../types/browsing"
import {
  getCurrentUser,
  logout,
  getMyBrowsing,
  formatDateHour
} from "../../utils/functions"
const user: CurrentUser = getCurrentUser()

const Mypage = () => {
  const [CurrentUser, setCurrentUser] = useState<CurrentUser>({})
  const [myBrowings, setMyBrowings] = useState<ResBrowsing[]>([])

  const handleLogout = () => {
    if (window.confirm("ログインしますか？")) {
      logout()
    }
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let resBrowing: ResBrowsing[]
      if (user) {
        resBrowing = await getMyBrowsing(user.uid)
      }
      if (!unmounted) {
        setMyBrowings(resBrowing)
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

            <h3>最近見た記事</h3>
            {myBrowings &&
              myBrowings.map((browing: ResBrowsing) => {
                return (
                  <div key={browing.id}>
                    <dl>
                      <dt>記事</dt>
                      <dd>{browing.summary_id && browing.summary_id.title}</dd>
                    </dl>
                    <dl>
                      <dt>閲覧日時</dt>
                      <dd>{formatDateHour(browing.update_date)}</dd>
                    </dl>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Mypage

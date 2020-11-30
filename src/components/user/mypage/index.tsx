import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { CurrentUser, ResultResponse, ResBrowsing } from "../../../types"
import { MypageSidebar } from "../.."
import {
  getCurrentUser,
  getMyBrowsings,
  formatDateHour
} from "../../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const Mypage = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [myBrowings, setMyBrowings] = useState<ResBrowsing[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        let resBrowing: ResBrowsing[]
        if (user) {
          resBrowing = await getMyBrowsings(user.id)
        }
        setMyBrowings(resBrowing)
      } catch (e) {}
    }

    loadData()
  }, [])

  return (
    <>
      {loading && (
        <div className="mypage_main">
          <div className="main-block _block-center _block-list">
            <div className="user-mypage">
              <h1 className="main-title blue-main-title">MY PAGE</h1>
              <div className="mypage-content">
                <MypageSidebar user={currentUser} />
                <div className="_main-block"></div>
              </div>

              <p>{currentUser.displayName}</p>

              <h3>最近見た記事</h3>
              {myBrowings &&
                myBrowings.map((browing: ResBrowsing) => {
                  return (
                    <div key={browing.id}>
                      <dl>
                        <dt>記事</dt>
                        <dd>
                          {browing.summary_id && browing.summary_id.title}
                        </dd>
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
      )}
    </>
  )
}

export default Mypage

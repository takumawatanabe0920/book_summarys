import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { CurrentUser, ResultResponse, ResBrowsing } from "../../../types"
import { MypageSidebar, SummaryStackItem } from "../.."
import {
  getCurrentUser,
  getMyBrowsings,
  formatDateHour
} from "../../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const MypageBrowsings = () => {
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
          <div className="l-container">
            <div className="main-block _block-center">
              <div className="user-mypage">
                <h1 className="main-title blue-main-title">MY PAGE</h1>
                <div className="mypage-content">
                  <MypageSidebar user={currentUser} />
                  <div className="_mypage">
                    <h2 className="sub-ttl">閲覧履歴</h2>
                    {myBrowings &&
                      myBrowings.map((browsing: ResBrowsing) => {
                        return (
                          <SummaryStackItem
                            data={browsing.summary_id}
                            time={browsing.update_date}
                          />
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MypageBrowsings
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { CurrentUser, ResultResponseList, ResSummaryBook } from "../../../types"
import { MypageSidebar } from "../.."
import { getCurrentUser, getMySummaries } from "../../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const MypageSummaries = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [summaries, setSummaries] = useState<ResSummaryBook[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const resMySummariesDataList: ResultResponseList<ResSummaryBook> = await getMySummaries(
          6,
          1,
          currentUser.id
        )
        console.log(resMySummariesDataList)
        if (resMySummariesDataList && resMySummariesDataList.status === 200) {
          console.log(resMySummariesDataList)
          setSummaries(resMySummariesDataList.data)
        }
      } catch (e) {}
    }

    loadData()
  }, [])

  return (
    <>
      {loading && (
        <div className="mypage_main">
          <div className="md-container">
            <div className="main-block _block-center">
              <div className="user-mypage">
                <h1 className="main-title blue-main-title">MY PAGE</h1>
                <div className="mypage-content">
                  <MypageSidebar user={currentUser} />
                  <div className="_main-block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MypageSummaries

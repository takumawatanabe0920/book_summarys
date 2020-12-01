import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { CurrentUser, ResultResponseList, ResSummaryBook } from "../../../types"
import { MypageSidebar, SummaryStackItem } from "../.."
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
        if (resMySummariesDataList && resMySummariesDataList.status === 200) {
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
          <div className="l-container">
            <div className="main-block _block-center">
              <div className="user-mypage">
                <h1 className="main-title blue-main-title">MY PAGE</h1>
                <div className="mypage-content">
                  <MypageSidebar user={currentUser} />
                  <div className="_mypage">
                    <h2 className="sub-ttl">投稿記事一覧</h2>
                    {summaries &&
                      summaries.map((summaryBook: ResSummaryBook) => {
                        return <SummaryStackItem data={summaryBook} />
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

export default MypageSummaries

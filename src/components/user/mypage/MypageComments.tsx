import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import {
  CurrentUser,
  ResSummaryComment,
  ResultResponseList
} from "../../../types"
import { MypageSidebar, SummaryStackItem } from "../.."
import { getCurrentUser, getMyComments } from "../../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const MypageComments = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [summaryComments, setSummaryComments] = useState<ResSummaryComment[]>(
    []
  )
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const resMySummaryCommentsDataList: ResultResponseList<ResSummaryComment> = await getMyComments(
          currentUser.id
        )
        if (
          resMySummaryCommentsDataList &&
          resMySummaryCommentsDataList.status === 200
        ) {
          setSummaryComments(resMySummaryCommentsDataList.data)
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
                    <h2 className="sub-ttl">コメントした記事一覧</h2>
                    {summaryComments &&
                      summaryComments.map(
                        (summaryComment: ResSummaryComment) => {
                          return (
                            <SummaryStackItem
                              data={summaryComment.summary_id}
                            />
                          )
                        }
                      )}
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

export default MypageComments

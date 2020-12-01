import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import {
  CurrentUser,
  ResSummaryComment,
  ResultResponseList
} from "../../../types"
import { MypageSidebar } from "../.."
import { getCurrentUser, getMyComments } from "../../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const MypageComments = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [ResSummaryComments, setSummaryComments] = useState<
    ResSummaryComment[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const resMySummaryCommentsDataList: ResultResponseList<ResSummaryComment> = await getMyComments(
          currentUser.id
        )
        console.log(resMySummaryCommentsDataList)
        if (
          resMySummaryCommentsDataList &&
          resMySummaryCommentsDataList.status === 200
        ) {
          console.log(resMySummaryCommentsDataList)
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

export default MypageComments

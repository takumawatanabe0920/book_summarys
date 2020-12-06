import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  ResUser,
  ResSummaryComment,
  ResultResponseList,
  ResultResponse
} from "../../../types"
import { MypageSidebar, SummaryStackItem } from "../.."
import { getIdUser, getMyComments } from "../../../firebase/functions"

const MypageComments = () => {
  const [user, setUser] = useState<ResUser>({})
  const [summaryComments, setSummaryComments] = useState<ResSummaryComment[]>(
    []
  )
  const [loading, setLoading] = useState<boolean>(false)
  const url: { id: string } = useParams()

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const resUser: ResultResponse<ResUser> = await getIdUser(url.id)
        const resMySummaryCommentsDataList: ResultResponseList<ResSummaryComment> = await getMyComments(
          url.id
        )
        if (resUser && resUser.status === 200) {
          setUser(resUser.data)
        }
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
                  <MypageSidebar user={user} />
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

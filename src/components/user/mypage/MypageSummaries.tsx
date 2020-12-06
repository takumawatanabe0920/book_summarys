import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  ResultResponseList,
  ResultResponse,
  ResSummaryBook,
  ResUser,
  ResUser as CurrentUser
} from "../../../types"
import { MypageSidebar, SummaryStackItem } from "../.."
import {
  getMySummaries,
  getMyPublicSummaries,
  getIdUser,
  getCurrentUser
} from "../../../firebase/functions"
const resCurrentUser: CurrentUser = getCurrentUser()

const MypageSummaries = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(resCurrentUser)
  const [user, setUser] = useState<ResUser>({})
  const [summaries, setSummaries] = useState<ResSummaryBook[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const url: { id: string } = useParams()

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const resUser: ResultResponse<ResUser> = await getIdUser(url.id)
        let resMySummariesDataList: ResultResponseList<ResSummaryBook>
        if (currentUser.id === url.id) {
          resMySummariesDataList = await getMySummaries(6, 1, url.id)
        } else {
          resMySummariesDataList = await getMyPublicSummaries(
            6,
            1,
            url.id,
            "public"
          )
          console.log(resMySummariesDataList)
        }
        if (resUser && resUser.status === 200) {
          setUser(resUser.data)
        }
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
                  <MypageSidebar user={user} />
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

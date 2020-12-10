import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import {
  ResultResponseList,
  ResultResponse,
  ResSummaryBook,
  ResUser
} from "../../../types"
import { MypageSidebar, MypageSummaryStackItem } from "../.."
import {
  getMySummaries,
  getMyPublicSummaries,
  getIdUser
} from "../../../firebase/functions"
import { GlobalContext } from "../../../assets/hooks/context/Global"

const MypageSummaries = () => {
  const [user, setUser] = useState<ResUser>({})
  const [summaries, setSummaries] = useState<ResSummaryBook[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const url: { id: string } = useParams()
  const { currentUser, setCurrentUser } = useContext(GlobalContext)

  useEffect(() => {
    const loadData = async () => {
      console.log(currentUser)
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
    setLoading(true)
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
                        return <MypageSummaryStackItem data={summaryBook} />
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

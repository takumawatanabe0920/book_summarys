import React, { useState, useEffect } from "react"
// components
import { SummaryList, Sidebar, TopSummaryList, Loading } from "./../components"
import { ResSummaryBook, ResultResponseList } from "./../types"
import { getOneConditionsSummaries } from "../firebase/functions"
import { Link } from "react-router-dom"
const HomePage = () => {
  const [summaries, setSummaries] = useState<ResSummaryBook[]>([])
  const [newSummaries, setNewSummaries] = useState<ResSummaryBook[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  let getSummaryNum = 0
  if (window.innerWidth < 768) {
    getSummaryNum = 4
  } else {
    getSummaryNum = 6
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        let resRecommendSummariesDataList: ResultResponseList<ResSummaryBook> = await getOneConditionsSummaries(
          6,
          1,
          ["favorite_count", "desc"],
          ["publishing_status", "public"]
        )
        let resNewSummariesDataList: ResultResponseList<ResSummaryBook> = await getOneConditionsSummaries(
          4,
          1,
          ["update_date", "desc"],
          ["publishing_status", "public"]
        )
        if (
          resRecommendSummariesDataList &&
          resRecommendSummariesDataList.status === 200
        ) {
          setSummaries(resRecommendSummariesDataList.data)
        }
        if (resNewSummariesDataList && resNewSummariesDataList.status === 200) {
          setNewSummaries(resNewSummariesDataList.data)
        }
        setLoading(true)
      } catch (e) {}
    }

    loadData()
  }, [])

  return (
    <>
      {loading ? (
        <>
          <TopSummaryList />
          <div className="l-main">
            <div className="main-block">
              <div className="article-block">
                <h2 className="main-title blue-main-title blue-back">
                  おすすめ記事！
                </h2>
                <SummaryList dataList={summaries} />
                <div className="btn-area">
                  <Link to="/summary" className="_btn center-btn">
                    もっと見る
                  </Link>
                </div>
              </div>
              <div className="article-block">
                <h2 className="main-title blue-main-title blue-back">
                  新着記事
                </h2>
                <SummaryList dataList={newSummaries} articleType="stack" />
              </div>
            </div>
            <Sidebar />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default HomePage

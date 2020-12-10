import React, { useState, useEffect } from "react"
// components
import { SummaryList, Sidebar, TopSummaryList } from "./../components"
import { ResSummaryBook, ResultResponseList } from "./../types"
import { getNewSummaries } from "../firebase/functions"
import { Link } from "react-router-dom"
const HomePage = () => {
  const [summaries, setSummaries] = useState<ResSummaryBook[]>([])
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
        let resSummariesDataList: ResultResponseList<ResSummaryBook> = await getNewSummaries(
          getSummaryNum,
          "public"
        )
        if (resSummariesDataList && resSummariesDataList.status === 200) {
          setSummaries(resSummariesDataList.data)
        }
      } catch (e) {}
    }

    loadData()
    setLoading(true)
  }, [])

  return (
    <>
      {loading && (
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
                <SummaryList dataList={summaries} articleType="stack" />
                {/* <div className="btn-area">
                  <Link to="/summary" className="_btn center-btn">
                    もっと見る
                  </Link>
                </div> */}
              </div>
            </div>
            <Sidebar />
          </div>
        </>
      )}
    </>
  )
}

export default HomePage

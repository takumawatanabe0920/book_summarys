import React, { useState, useEffect, useMemo } from "react"
// components
import { SummaryList, Sidebar, TopSummaryList } from "./../components"
import { ResSummaryBook, ResultResponseList } from "./../types"
import { getSummaries, getSummariesCount } from "../firebase/functions"
import { Link } from "react-router-dom"

const HomePage = () => {
  const [summaries, setSummaries] = useState([])
  const [summariesNum, setSummariesNum] = useState(0)

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let resSummariesDataList: ResultResponseList<ResSummaryBook> = await getSummaries(
        6,
        1
      )
      let count: number = await getSummariesCount()
      if (!unmounted) {
        if (resSummariesDataList && resSummariesDataList.status === 200) {
          setSummaries(resSummariesDataList.data)
        }
        setSummariesNum(count)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])
  return (
    <>
      <TopSummaryList />
      <div className="l-main">
        <div className="main-block">
          <div className="article-block">
            <h2 className="main-title blue-main-title">新着要約記事</h2>
            <SummaryList dataList={summaries} />
            <div className="btn-area">
              <Link to="/summary" className="_btn">
                もっと見る
              </Link>
            </div>
          </div>
          <div className="article-block">
            <h2 className="main-title blue-main-title">おすすめ！</h2>
            <SummaryList dataList={summaries} />
            <div className="btn-area">
              <Link to="/summary" className="_btn">
                もっと見る
              </Link>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default HomePage

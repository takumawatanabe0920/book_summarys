import React, { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { ResSummaryBook } from "../../types"
import { getSummaries, getRankingSummaries } from "../../utils/functions"

const Sidebar = () => {
  const [allRankingSummaries, setAllRankingSummaries] = useState<
    ResSummaryBook[]
  >([])
  const [rankingThisWeekSummaries, setRankingThisWeekSummaries] = useState<
    ResSummaryBook[]
  >([])
  const [thisMonthSummaries, setThisMonthSummaries] = useState<
    ResSummaryBook[]
  >([])

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let summariesRankingDataList = await getRankingSummaries(3)
      console.log(summariesRankingDataList)
      // let count = await getSummariesCount()
      if (!unmounted) {
        setAllRankingSummaries(summariesRankingDataList)
        // setRankingThisWeekSummaries(summariesDataList)
        // setThisMonthSummaries()
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <div className="side-bar">
      <h3>総合ランキング</h3>
      <div className="article-box">
        {allRankingSummaries &&
          allRankingSummaries.map((summary: ResSummaryBook, _index: number) => {
            return (
              <Link
                to={`/summary/${summary.id}`}
                className="article-item"
                key={summary.id}
              >
                {_index + 1}位: {summary.title}
              </Link>
            )
          })}
        {/* <div className="article-item">1位: 死ぬこと以外かすり傷 画像</div>
        <div className="article-item">2位: 強者の流儀 画像</div>
        <div className="article-item">3位: GACKTの勝ち方 画像</div> */}
      </div>
      <h3>週間ランキング</h3>
      <div className="article-box">
        <div className="article-item">1位: 死ぬこと以外かすり傷 画像</div>
        <div className="article-item">2位: 強者の流儀 画像</div>
        <div className="article-item">3位: GACKTの勝ち方 画像</div>
      </div>
      <h3>月刊ランキング</h3>
      <div className="article-box">
        <div className="article-item">1位: 死ぬこと以外かすり傷 画像</div>
        <div className="article-item">2位: 強者の流儀 画像</div>
        <div className="article-item">3位: GACKTの勝ち方 画像</div>
      </div>
    </div>
  )
}

export default Sidebar

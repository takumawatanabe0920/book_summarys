import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ResSummaryBook, ResultResponseList } from "../../types"
import clsx from "clsx"
import { getSummaries, getRankingSummaries } from "../../firebase/functions"

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
    const loadData = async () => {
      try {
        let resSummariesRankingDataList: ResultResponseList<ResSummaryBook> = await getRankingSummaries(
          3
        )
        if (
          resSummariesRankingDataList &&
          resSummariesRankingDataList.status === 200
        ) {
          setAllRankingSummaries(resSummariesRankingDataList.data)
        }
      } catch (e) {}
    }

    loadData()
  }, [])

  return (
    <div className="side-bar">
      <h3 className="border-orange">週間ランキング</h3>
      <div className="article-box">
        {allRankingSummaries &&
          allRankingSummaries.map((summary: ResSummaryBook, _index: number) => {
            return (
              <dl>
                <dt>
                  <span className={clsx("ranking", `ranking${_index + 1}`)}>
                    {_index + 1}
                  </span>
                </dt>
                <dd>
                  <Link
                    to={`/summary/${summary.id}`}
                    className="article-item"
                    key={summary.id}
                  >
                    {summary.title}
                  </Link>
                </dd>
              </dl>
            )
          })}
      </div>
      <h3 className="border-green">月刊ランキング</h3>
      <div className="article-box">
        {allRankingSummaries &&
          allRankingSummaries.map((summary: ResSummaryBook, _index: number) => {
            return (
              <dl>
                <dt>
                  <span className={clsx("ranking", `ranking${_index + 1}`)}>
                    {_index + 1}
                  </span>
                </dt>
                <dd>
                  <Link
                    to={`/summary/${summary.id}`}
                    className="article-item"
                    key={summary.id}
                  >
                    {summary.title}
                  </Link>
                </dd>
              </dl>
            )
          })}
      </div>
      <h3 className="border-blue">総合ランキング</h3>
      <div className="article-box">
        {allRankingSummaries &&
          allRankingSummaries.map((summary: ResSummaryBook, _index: number) => {
            return (
              <dl>
                <dt>
                  <span className={clsx("ranking", `ranking${_index + 1}`)}>
                    {_index + 1}
                  </span>
                </dt>
                <dd>
                  <Link
                    to={`/summary/${summary.id}`}
                    className="article-item"
                    key={summary.id}
                  >
                    {summary.title}
                  </Link>
                </dd>
              </dl>
            )
          })}
      </div>
    </div>
  )
}

export default Sidebar

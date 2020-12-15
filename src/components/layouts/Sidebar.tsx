import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ResSummaryBook, ResultResponseList } from "../../types"
import clsx from "clsx"
import { getRankingSummaries } from "../../firebase/functions"
import useReactRouter from "use-react-router"

const Sidebar = () => {
  const [allRankingSummaries, setAllRankingSummaries] = useState<
    ResSummaryBook[]
  >([])
  const [rankingThisWeekSummaries, setRankingThisWeekSummaries] = useState<
    ResSummaryBook[]
  >([])
  const [rankingThisMonthSummaries, setRankingThisMonthSummaries] = useState<
    ResSummaryBook[]
  >([])
  const { history } = useReactRouter()

  const changeUrl = (_data: any) => {
    history.push(`/summary/${_data.id}`)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        let resSummariesRankingDataList: ResultResponseList<ResSummaryBook> = await getRankingSummaries(
          3,
          "public",
          "all"
        )
        let resWeekSummariesRankingDataList: ResultResponseList<ResSummaryBook> = await getRankingSummaries(
          3,
          "public",
          "week"
        )
        let resMonthSummariesRankingDataList: ResultResponseList<ResSummaryBook> = await getRankingSummaries(
          3,
          "public",
          "month"
        )
        if (
          resSummariesRankingDataList &&
          resSummariesRankingDataList.status === 200
        ) {
          setAllRankingSummaries(resSummariesRankingDataList.data)
        }
        if (
          resWeekSummariesRankingDataList &&
          resWeekSummariesRankingDataList.status === 200
        ) {
          setRankingThisWeekSummaries(resWeekSummariesRankingDataList.data)
        }
        if (
          resMonthSummariesRankingDataList &&
          resMonthSummariesRankingDataList.status === 200
        ) {
          setRankingThisMonthSummaries(resMonthSummariesRankingDataList.data)
        }
      } catch (e) {}
    }

    loadData()
  }, [])

  return (
    <div className="side-bar">
      <h3 className="border-orange">週間ランキング</h3>
      <div className="article-box">
        {rankingThisWeekSummaries &&
          rankingThisWeekSummaries.map(
            (summary: ResSummaryBook, _index: number) => {
              return (
                <dl>
                  <dt>
                    <span className={clsx("ranking", `ranking-week`)}>
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
            }
          )}
      </div>
      <h3 className="border-green">月刊ランキング</h3>
      <div className="article-box">
        {rankingThisMonthSummaries &&
          rankingThisMonthSummaries.map(
            (summary: ResSummaryBook, _index: number) => {
              return (
                <dl>
                  <dt>
                    <span className={clsx("ranking", `ranking-month`)}>
                      {_index + 1}
                    </span>
                  </dt>
                  <dd>
                    <div
                      onClick={() => changeUrl(summary)}
                      className="article-item"
                      key={summary.id}
                    >
                      {summary.title}
                    </div>
                  </dd>
                </dl>
              )
            }
          )}
      </div>
      <h3 className="border-blue">総合ランキング</h3>
      <div className="article-box mbt0">
        {allRankingSummaries &&
          allRankingSummaries.map((summary: ResSummaryBook, _index: number) => {
            return (
              <dl>
                <dt>
                  <span className={clsx("ranking", `ranking-total`)}>
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

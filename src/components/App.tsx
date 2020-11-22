import React, { useState, useEffect, useMemo } from "react"
// components
import { SummaryList, Pager, Sidebar } from "./../components"
import { ResSummaryBook, ResultResponseList } from "./../types"
import useReactRouter from "use-react-router"
import {
  getSummaries,
  readQuery,
  getSummariesCount
} from "../firebase/functions"

// sections

const HomePage = () => {
  const [summaries, setSummaries] = useState([])
  const [summariesNum, setSummariesNum] = useState(0)
  const [page, setPage] = useState(Number(readQuery("pages") || 1))
  const { history } = useReactRouter()

  const fetchData = (num?: number) => {
    setPage(num)
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let resSummariesDataList: ResultResponseList<ResSummaryBook> = await getSummaries(
        6,
        page
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
  }, [page])
  return (
    <>
      <div className="l-main">
        <div className="main-block">
          <h2 className="main-title blue-main-title">新着要約記事</h2>
          <SummaryList dataList={summaries} />
          <Pager fetchData={fetchData} dataNum={summariesNum} />
          <h2 className="main-title blue-main-title">関連要約記事</h2>
          <SummaryList dataList={summaries} />
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default HomePage

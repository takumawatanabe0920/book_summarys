import React, { useState, useEffect, useMemo } from "react"
// components
import Sidebar from "./layouts/Sidebar"
import SummaryList from "./summary/SummaryList"
import functions from "./../utils/functions"
import Pager from "./common/parts/Pager"
const { getSummaries, readQuery } = functions

// sections

const IndexPage = () => {
  const [summaries, setSummaries] = useState([])
  const [page, setPage] = useState(Number(readQuery("pages")))

  const fetchData = (num?: number) => {
    setPage(num)
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let summariesDataList = await getSummaries(6, page)
      if (!unmounted) {
        setSummaries(summariesDataList)
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
          <Pager fetchData={fetchData} />
          <h2 className="main-title blue-main-title">関連要約記事</h2>
          <SummaryList dataList={summaries} />
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default IndexPage

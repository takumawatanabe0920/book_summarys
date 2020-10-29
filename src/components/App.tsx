import React, { useState, useEffect, useMemo } from "react"
// components
import Sidebar from "./layouts/Sidebar"
import SummaryList from "./summary/SummaryList"
import functions from "../utils/functions"
const { getSummaries } = functions

// sections

const IndexPage = () => {
  const [summaries, setSummaries] = useState([])

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let summaries = await getSummaries()
      if (!unmounted) {
        setSummaries(summaries)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])
  return (
    <>
      <div className="l-main">
        <div className="main-block">
          <h2 className="main-title blue-main-title">新着要約記事</h2>
          <SummaryList dataList={summaries} />
          <h2 className="main-title blue-main-title">関連要約記事</h2>
          <SummaryList dataList={summaries} />
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default IndexPage

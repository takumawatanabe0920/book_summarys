import React, { useState, useEffect, useMemo } from "react"
// components
import { SummaryList, SummaryCategories } from ".."
import { ResSummaryBook, ResultResponseList } from "../../types"
import {
  getSummaries,
  readQuery,
  getSummariesCount,
  getSelectCategorySummaries
} from "../../firebase/functions"
import { Link } from "react-router-dom"

// sections

type UpdateData = {
  query: string
  name: string
}

const SummaryIndexPage = () => {
  const [summaries, setSummaries] = useState<ResSummaryBook[]>([])
  const [selectSummaries, setSelectSummaries] = useState<ResSummaryBook[]>([])
  const [summariesNum, setSummariesNum] = useState(0)
  const [page, setPage] = useState(Number(readQuery("pages") || 1))
  const [updateData, setUpdateData] = useState<UpdateData>({
    query: readQuery("category"),
    name: ""
  })

  const fetchData = (categoryId?: string, categoryName?: string) => {
    setUpdateData({ query: categoryId, name: categoryName })
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let resSummariesDataList: ResultResponseList<ResSummaryBook> = await getSummaries(
        6,
        page
      )
      let resSelectSummariesDataList: ResultResponseList<ResSummaryBook> = await getSelectCategorySummaries(
        6,
        page,
        updateData.query
      )
      let count: number = await getSummariesCount()
      if (!unmounted) {
        if (resSummariesDataList && resSummariesDataList.status === 200) {
          setSummaries(resSummariesDataList.data)
        }
        if (
          resSelectSummariesDataList &&
          resSelectSummariesDataList.status === 200
        ) {
          setSelectSummaries(resSelectSummariesDataList.data)
        }
        setSummariesNum(count)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [page, updateData])
  return (
    <>
      <div className="summary-contents">
        <SummaryCategories fetchData={fetchData} />
        <div className="main-block _block-center _block-list">
          {updateData && updateData.query && (
            <div className="article-block">
              <h2 className="main-title blue-main-title">
                {updateData && updateData.name}記事
              </h2>
              {selectSummaries.length > 0 ? (
                <>
                  <SummaryList
                    dataList={selectSummaries}
                    columnNum={"three-column"}
                  />
                  <div className="btn-area">
                    <Link to="/summary" className="_btn">
                      もっと見る
                    </Link>
                  </div>
                </>
              ) : (
                <h3 className="not-find">記事が見当たりませんでした。</h3>
              )}
            </div>
          )}
          <div className="article-block">
            <h2 className="main-title blue-main-title">おすすめ記事！</h2>
            <SummaryList dataList={summaries} columnNum={"three-column"} />
            <div className="btn-area">
              <Link to="/summary" className="_btn">
                もっと見る
              </Link>
            </div>
          </div>
          {/* <div className="article-block">
            <h2 className="main-title blue-main-title">おすすめ記事！</h2>
            <SummaryList dataList={summaries} columnNum={"three-column"} />
            <div className="btn-area">
              <Link to="/summary" className="_btn">
                もっと見る
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default SummaryIndexPage

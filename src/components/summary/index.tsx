import React, { useState, useEffect } from "react"
// components
import { SummaryList, SummaryCategories, Pager } from ".."
import { ResSummaryBook, ResultResponseList } from "../../types"
import {
  getSummaries,
  readQuery,
  getSelectCategorySummaries,
  getCategorySummariesCount
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
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState(Number(readQuery("pages") || 1))
  const [updateData, setUpdateData] = useState<UpdateData>({
    query: readQuery("category"),
    name: ""
  })

  const fetchData = (categoryId?: string, categoryName?: string) => {
    setUpdateData({ query: categoryId, name: categoryName })
    const resetPage = 1
    setPage(resetPage)
  }

  const fetchPager = (num: number) => {
    setPage(num)
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        let resSummariesDataList: ResultResponseList<ResSummaryBook> = await getSummaries(
          6,
          1,
          "public"
        )
        let resSelectSummariesDataList: ResultResponseList<ResSummaryBook> = await getSelectCategorySummaries(
          6,
          page,
          "public",
          updateData.query
        )
        let count: number = 0
        if (updateData && updateData.query) {
          count = await getCategorySummariesCount(updateData.query, "public")
        }
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
      } catch (e) {}
    }

    loadData()
  }, [page, updateData])

  return (
    <>
      {loading && (
        <div className="summary-contents">
          <SummaryCategories fetchData={fetchData} />
          <div className="l-container">
            <div className="main-block _block-center">
              {updateData && updateData.query && (
                <div className="article-block">
                  <h2 className="main-title blue-main-title">
                    {updateData && updateData.name}記事
                  </h2>
                  {selectSummaries.length > 0 ? (
                    <>
                      <SummaryList dataList={selectSummaries} />
                      <Pager fetchPager={fetchPager} dataNum={summariesNum} />
                    </>
                  ) : (
                    <h3 className="not-find">記事が見当たりませんでした。</h3>
                  )}
                </div>
              )}
              <div className="article-block">
                <h2 className="main-title blue-main-title">おすすめ記事！</h2>
                <SummaryList dataList={summaries} />
                {/* <div className="btn-area">
                  <Link to="/summary" className="_btn center-btn">
                    もっと見る
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SummaryIndexPage

import React, { useState, useEffect } from "react"
// components
import { SummaryList, SummaryCategories, Pager } from ".."
import { ResSummaryBook, ResultResponseList } from "../../types"
import {
  getOneConditionsSummaries,
  readQuery,
  getTwoConditionsSummaries,
  getTwoConditionsSummaryCount
} from "../../firebase/functions"

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
  const [dataNumPerPage, setDataNumPerPager] = useState(6)

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
      console.log(updateData)
      console.log(page)
      try {
        let resSummariesDataList: ResultResponseList<ResSummaryBook> = await getOneConditionsSummaries(
          6,
          1,
          ["publishing_status", "public"]
        )
        let resSelectSummariesDataList: ResultResponseList<ResSummaryBook> = await getTwoConditionsSummaries(
          dataNumPerPage,
          page,
          ["category", updateData.query, "publishing_status", "public"]
        )
        let count: number = 0
        if (updateData && updateData.query) {
          count = await getTwoConditionsSummaryCount([
            "category",
            updateData.query,
            "publishing_status",
            "public"
          ])
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
                      <Pager
                        fetchPager={fetchPager}
                        dataNum={summariesNum}
                        dataNumPerPage={dataNumPerPage}
                      />
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

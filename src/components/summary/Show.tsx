import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "../layouts/Sidebar"
import { ResSummaryBook, Category, SubCategory } from "../../types/summary"
import functions from "../../utils/functions"
const { getSummaryBook, getCategory, getSubCategory } = functions

const SummaryShowPage = () => {
  const [summarybook, setSummaryBook] = useState<ResSummaryBook>({})
  const [category, setCategory] = useState<Category>({})
  const [subCategory, setSubCategory] = useState<SubCategory>({})

  const url: { id: string } = useParams()

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const resSummaryBook: void | any = await getSummaryBook(url.id)
      const resCategory: void | any = await getCategory(resSummaryBook.category)
      let resSubCategory: void | any = ""
      if (resSummaryBook.sub_category) {
        resSubCategory = await getSubCategory(resSummaryBook.sub_category)
      }
      if (!unmounted) {
        setSummaryBook(resSummaryBook)
        setCategory(resCategory)
        setSubCategory(resSubCategory)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="summary_main">
        <div className="main-block">
          <div className="prof-area">
            <div className="_icon">
              <img src="" alt="" />
            </div>
            <div className="_icon">渡辺拓馬</div>
          </div>
          <div className="summary-show">
            <div className="_header">
              <h1 className="main-title blue-main-title">
                {summarybook.title}
              </h1>
              <div className="tags">
                {/* TODO リンク：カテゴリー記事に飛ばす */}
                <span className="tag">{category.name}</span>
                <span className="tag">
                  {subCategory ? subCategory.name : ""}
                </span>
              </div>
            </div>
            <div className="_body">
              <p className="_txt">{summarybook.content}</p>
            </div>
            <div className="_footer">
              <dl>
                <dt>値段：</dt>
                <dd>{summarybook.price}円</dd>
              </dl>
              <dl>
                <dt>著者：</dt>
                <dd>{summarybook.author}</dd>
              </dl>
              <dl>
                <dt>商品リンク：</dt>
                <dd>{summarybook.product_links}</dd>
              </dl>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default SummaryShowPage

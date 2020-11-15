import React, { FC, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getUser } from "../../../firebase/functions"
import { ResSummaryBook, Category, SubCategory } from "../../../types"

type Props = {
  summaryBook: ResSummaryBook
  category: Category
  subCategory: SubCategory
}

const SummaryDetails: FC<Props> = props => {
  const { summaryBook, category, subCategory } = props
  useEffect(() => {
    let unmounted = false
    ;(async () => {})()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="prof-area">
        <div className="_icon">
          <img src="" alt="" />
        </div>
        <Link to={`/user/${summaryBook.user_id}`} className="_icon">
          渡辺拓馬
        </Link>
      </div>
      <div className="summary-show">
        <div className="_header">
          <h1 className="main-title blue-main-title">{summaryBook.title}</h1>
          <div className="tags">
            {/* TODO リンク：カテゴリー記事に飛ばす */}
            <span className="tag">{category.name}</span>
            <span className="tag">{subCategory ? subCategory.name : ""}</span>
          </div>
        </div>
        <div className="_body">
          <p className="_txt">{summaryBook.content}</p>
        </div>
        <div className="_footer">
          <dl>
            <dt>値段：</dt>
            <dd>{summaryBook.price}円</dd>
          </dl>
          <dl>
            <dt>著者：</dt>
            <dd>{summaryBook.author}</dd>
          </dl>
          <dl>
            <dt>商品リンク：</dt>
            <dd>{summaryBook.product_links}</dd>
          </dl>
        </div>
      </div>
    </>
  )
}

export default SummaryDetails

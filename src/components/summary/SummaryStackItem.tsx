import React, { useState, FC } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { ResSummaryBook } from "./../../types"
import { formatUpdateDate, formatTagColor } from "./../../utils/function"
import { UserIcon } from "./../"
type Props = {
  data: ResSummaryBook
}

const SummaryStackItem: FC<Props> = props => {
  const { data } = props

  return (
    <>
      <Link to={`/summary/${data.id}`} className="summaries-stack">
        <div className="_stack-header">
          <UserIcon user_id={data.user_id} size="min" />
          <p className="_date">
            が{formatUpdateDate(data.update_date)}に投稿しました。
          </p>
        </div>
        <div className="_txt-box">
          <h3 className="_title">{data.title}</h3>
          <dl className="_book-name">
            <dt>参考本:</dt>
            <dd>{data.book_name}</dd>
          </dl>
          <div className="categories">
            <span
              className={clsx(
                "main-tag",
                data.category.name ? formatTagColor(data.category.name) : ""
              )}
            >
              {data.category && data.category.name}
            </span>
            {data.sub_category && (
              <span className="main-tag sub-tag">{data.sub_category.name}</span>
            )}
          </div>
          {/* <p className="_description">{data.discription}</p> */}
        </div>
      </Link>
    </>
  )
}

export default SummaryStackItem

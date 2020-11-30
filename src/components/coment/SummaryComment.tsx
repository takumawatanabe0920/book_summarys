import React from "react"
import { CommentList } from "./../../components"

interface Props<T> {
  dataList: T[]
}

function SummaryComment<T>(props: Props<T>): JSX.Element {
  const { dataList } = props

  return (
    <>
      <div className="comment_main">
        <CommentList<T> dataList={dataList} />
      </div>
    </>
  )
}

export default SummaryComment

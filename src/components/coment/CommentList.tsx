import React from "react"
import { CommentItem } from "./../../components"
import { comments } from "../../utils/icons"

interface Props<T> {
  dataList: T[]
}

interface PropsData {
  id?: string
}

function CommentList<T extends PropsData>(props: Props<T>): JSX.Element {
  const { dataList } = props

  return (
    <>
      <div className="comment-list">
        <div className="_icon-title">
          <div className="_comment-logo">
            <img src={comments} alt="コメント" />
          </div>
          <h3 className="_title">コメント</h3>
        </div>
        {dataList.map((data: T) => {
          return <CommentItem<T> key={data.id} data={data} />
        })}
      </div>
    </>
  )
}

export default CommentList

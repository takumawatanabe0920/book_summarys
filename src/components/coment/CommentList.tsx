import React from "react"
import { CommentItem } from "./../../components"

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
      <div className="data-list">
        {dataList.map((data: T) => {
          return <CommentItem<T> key={data.id} data={data} />
        })}
      </div>
    </>
  )
}

export default CommentList

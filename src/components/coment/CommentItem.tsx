import React from "react"

type Props<T> = {
  data: T
}

interface PropsData {
  id?: string
  user_id?: string
  comment?: string
  update_date?: string
}

function CommentItem<T extends PropsData>(props: Props<T>): JSX.Element {
  const { data } = props
  console.log(data)

  return (
    <>
      <div className="data-item">
        <div className="_txt-box">
          <p className="_summary-txt">{data.user_id}</p>
          <p className="_summary-txt">{data.comment}</p>
          <p className="_summary-txt">{data.update_date}</p>
        </div>
      </div>
    </>
  )
}

export default CommentItem

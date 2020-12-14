import React from "react"
import { formatDateHour } from "../../firebase/functions"
import { UserIcon } from "./../"
type Props<T> = {
  data: T
}

interface PropsData {
  id?: string
  user_id?: any
  comment?: string
  update_date?: firebase.firestore.Timestamp
}

function CommentItem<T extends PropsData>(props: Props<T>): JSX.Element {
  const { user_id, comment, update_date } = props.data

  return (
    <>
      <div className="comment-item">
        <div className="comment-header">
          <div className="_header-left">
            <UserIcon user_id={user_id} size="min" />
          </div>
          <div className="_header-right">
            <time className="_date">{formatDateHour(update_date)}</time>
          </div>
        </div>
        <div className="comment-body">
          <p className="_comment-txt">{comment}</p>
        </div>
      </div>
    </>
  )
}

export default CommentItem

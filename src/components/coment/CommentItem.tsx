import React, { useState } from "react"
import { formatDateHour } from "../../firebase/functions"
import Avatar from "@material-ui/core/Avatar"

type Props<T> = {
  data: T
}

interface PropsData {
  id?: string
  user_id?: string
  user_name?: string
  comment?: string
  update_date?: number
}

function CommentItem<T extends PropsData>(props: Props<T>): JSX.Element {
  const { id, user_id, user_name, comment, update_date } = props.data

  return (
    <>
      <div className="comment-item">
        <div className="comment-header">
          <div className="_header-left">
            <Avatar />
            <p className="user-name">{user_name ? user_name : "名無"}</p>
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

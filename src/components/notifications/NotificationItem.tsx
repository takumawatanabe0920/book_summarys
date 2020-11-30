import React from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { FavoriteIcon } from "../../utils/material"
import { comments } from "../../utils/icons"
import { formatUpdateDate } from "../../utils/function"

interface Props<T> {
  data: T
}

interface PropsData {
  id?: string
  type?: string
  user_name?: string
  is_read?: boolean
  target_id?: any
  update_date?: number
}

function NotificationItem<T extends PropsData>(props: Props<T>): JSX.Element {
  const { id, type, user_name, is_read, target_id, update_date } = props.data

  const notificationType = (_type: string): string => {
    switch (_type) {
      case "favorite":
        return "お気に入り"
      case "summary_comment":
        return "コメント"
    }
  }

  const notificationTypeLogo = (_type: string) => {
    if (_type === "favorite") {
      return <FavoriteIcon className="favorite-button isClick" />
    } else if (_type === "summary_comment") {
      return (
        <div className="_logo">
          <img src={comments} alt="コメント" />
        </div>
      )
    }
  }

  const notificationComment = (_type: string) => {
    if (_type === "summary_comment") {
      return <div className="_comment">{target_id.comment}</div>
    }
  }

  return (
    <>
      <Link
        to={`/summary/${target_id.id}`}
        className={clsx("data-item", is_read ? "read" : "")}
      >
        <div className="left-block">{notificationTypeLogo(type)}</div>
        <div className="right-block">
          <p className="_notification-txt">
            <span className="_notification-txt bold">
              {user_name ? user_name : "名無"}
            </span>
            さんがあなたの記事を
            {notificationType(type)}しました。
          </p>
          {notificationComment(type)}
          <p className="_date-time">{formatUpdateDate(update_date)}</p>
        </div>
      </Link>
    </>
  )
}

export default NotificationItem

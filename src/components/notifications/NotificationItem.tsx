import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getUser } from "../../firebase/functions"
import { User } from "./../../types"

interface Props<T> {
  data: T
}

interface PropsData {
  id?: string
  type?: string
  target_id?: any
  update_date?: number
}

function NotificationItem<T extends PropsData>(props: Props<T>): JSX.Element {
  const [User, setUser] = useState<User>({})
  const { data } = props

  const notificationType = (_type: string): string => {
    switch (_type) {
      case "favorite":
        return "お気に入り"
      case "summary_comment":
        return "コメント"
    }
  }

  const notificationLink = () => {
    if (data.type === "favorite") {
      return (
        <Link to={`/summary/${data.target_id.id}`} className="data-item">
          <span className="tag">{notificationType(data.type)}</span>
          <div className="_txt-box">
            <h3 className="_summary-ttl">
              {User.displayName ? User.displayName : User.email}
              さんがあなたの記事を
              {notificationType(data.type)}しました。
            </h3>
            <p className="_summary-txt">{data.target_id.title}</p>
            <p className="_summary-txt">{data.update_date}</p>
          </div>
        </Link>
      )
    } else if (data.type === "summary_comment") {
      return (
        <Link to={`/summary/${data.target_id.id}`} className="data-item">
          <span className="tag">{notificationType(data.type)}</span>
          <div className="_txt-box">
            <h3 className="_summary-ttl">
              {User.displayName ? User.displayName : User.email}
              さんがあなたの記事に
              {notificationType(data.type)}しました。
            </h3>
            <p className="_summary-txt">{data.target_id.title}</p>
            <p className="_summary-txt">{data.update_date}</p>
          </div>
        </Link>
      )
    }
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let resUser = await getUser(data.target_id.user_id)
      let user: User = {}
      if (resUser && resUser.status === 200) {
        const { displayName, photoURL, email, password } = resUser.data
        user = { displayName, photoURL, email, password }
      }

      if (!unmounted) {
        setUser(user)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return <>{notificationLink()}</>
}

export default NotificationItem

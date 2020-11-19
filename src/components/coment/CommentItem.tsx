import React, { useState, useEffect } from "react"
import { getUser, formatDateHour } from "../../firebase/functions"
import { User } from "./../../types"
import Avatar from "@material-ui/core/Avatar"

type Props<T> = {
  data: T
}

interface PropsData {
  id?: string
  user_id?: string
  comment?: string
  update_date?: number
}

function CommentItem<T extends PropsData>(props: Props<T>): JSX.Element {
  const [User, setUser] = useState<User>({})
  const { data } = props

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let resUser = await getUser(data.user_id)
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

  return (
    <>
      <div className="comment-item">
        <div className="comment-header">
          <div className="_header-left">
            <Avatar />
            <p className="user-name">
              {User.displayName ? User.displayName : User.email}
            </p>
          </div>
          <div className="_header-right">
            <time className="_date">{formatDateHour(data.update_date)}</time>
          </div>
        </div>
        <div className="comment-body">
          <p className="_comment-txt">{data.comment}</p>
        </div>
      </div>
    </>
  )
}

export default CommentItem

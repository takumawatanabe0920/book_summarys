import React, { useState, useEffect } from "react"
import { formatDateHour, responseUploadImage } from "../../firebase/functions"
import { Link } from "react-router-dom"
import { userCircleIcon } from "./../../utils/icons"

type Props<T> = {
  data: T
}

interface PropsData {
  id?: string
  user_id?: any
  user_name?: string
  comment?: string
  update_date?: number
}

function CommentItem<T extends PropsData>(props: Props<T>): JSX.Element {
  const { user_id, user_name, comment, update_date } = props.data
  const [userIcon, setUserIcon] = useState<string>("")

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user_id && user_id.photoURL) {
          const resUserIcon: string = await responseUploadImage(
            user_id.photoURL
          )
          setUserIcon(resUserIcon)
        }
      } catch (e) {}
    }
    loadData()
  }, [])

  return (
    <>
      <div className="comment-item">
        <div className="comment-header">
          <div className="_header-left">
            <Link to={`/mypage/${user_id.id}/home`} className="_user-icon-area">
              <div className="_icon mini-icon">
                <img src={userIcon ? userIcon : userCircleIcon} alt="ロゴ" />
              </div>
              <p className="_user-txt mini-txt">{user_name}</p>
            </Link>
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

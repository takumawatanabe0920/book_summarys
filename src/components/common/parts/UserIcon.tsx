import React, { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { userCircleIcon } from "../../../utils/icons"
import { responseUploadImage } from "../../../firebase/functions"
import { ResUser } from "../../../types"
import clsx from "clsx"

type Props = {
  user_id: ResUser
  size?: string
}

const UserIcon: FC<Props> = props => {
  const [userIcon, setUserIcon] = useState<string>("")
  const { user_id, size } = props

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
  }, [userIcon])

  return (
    <>
      <Link to={`/mypage/${user_id.id}/home`} className="_user-icon-area">
        <div className={clsx("_icon", `${size === "min" ? "min-icon" : ""}`)}>
          <img src={userIcon ? userIcon : userCircleIcon} alt="ロゴ" />
        </div>
        <p className={clsx("_user-txt", `${size === "min" ? "min-txt" : ""}`)}>
          {user_id.displayName}
        </p>
      </Link>
    </>
  )
}

export default UserIcon

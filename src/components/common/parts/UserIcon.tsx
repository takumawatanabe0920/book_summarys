import React, { FC } from "react"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { userCircleIcon } from "../../../utils/icons"
import { ResUser } from "../../../types"
import clsx from "clsx"

type Props = {
  user_id: ResUser
  size?: string
}

const UserIcon: FC<Props> = props => {
  const { user_id, size } = props

  return (
    <>
      {Object.keys(user_id) && (
        <Link to={`/mypage/${user_id.id}/home`} className="_user-icon-area">
          <div className={clsx("_icon", `${size === "min" ? "min-icon" : ""}`)}>
            <LazyLoadImage
              alt="ロゴ"
              effect="blur"
              src={user_id.photoURL ? user_id.photoURL : userCircleIcon}
            />
          </div>
          <p
            className={clsx("_user-txt", `${size === "min" ? "min-txt" : ""}`)}
          >
            {user_id.displayName}
          </p>
        </Link>
      )}
    </>
  )
}

export default UserIcon

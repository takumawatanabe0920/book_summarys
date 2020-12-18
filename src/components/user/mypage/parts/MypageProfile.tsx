import React, { useState, FC } from "react"
import { ResUser } from "../../../../types"
import { userCircleIcon } from "../../../../utils/icons"

type Props = {
  user: ResUser
}

const MypageSidebar: FC<Props> = props => {
  const { user } = props

  return (
    <div className="_user-profile">
      <div className="_user-image">
        <img src={user.photoURL ? user.photoURL : userCircleIcon} alt="ロゴ" />
      </div>
      <dl>
        <dt className="_label">名前</dt>
        <dd className="_user-name">{user.displayName}</dd>
      </dl>
      <dl>
        <dt className="_label">メールアドレス</dt>
        <dd className="_user-name">{user.email}</dd>
      </dl>
    </div>
  )
}

export default MypageSidebar

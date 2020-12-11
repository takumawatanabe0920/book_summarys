import React, { useState, useEffect, FC } from "react"
import clsx from "clsx"
import { ResUser } from "../../../../types"
import { responseUploadImage } from "../../../../firebase/functions"
import { userCircleIcon } from "../../../../utils/icons"

type Props = {
  user: ResUser
}

const MypageSidebar: FC<Props> = props => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userIcon, setUserIcon] = useState<string>("")
  const { user } = props

  useEffect(() => {
    const loadData = async () => {
      try {
        const resUserIcon: string = await responseUploadImage(user.photoURL)
        setUserIcon(resUserIcon)
      } catch (e) {}
    }

    loadData()
    setLoading(true)
  }, [])

  return (
    <>
      {loading && (
        <div className="_user-profile">
          <div className="_user-image">
            <img src={userIcon ? userIcon : userCircleIcon} alt="ロゴ" />
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
      )}
    </>
  )
}

export default MypageSidebar

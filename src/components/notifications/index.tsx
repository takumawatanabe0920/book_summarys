import React, { useState, useEffect } from "react"
import { CurrentUser, ResNotification } from "../../types"
import { getCurrentUser, getMyNotifications } from "../../firebase/functions"
import { NotificationList, Pager } from "./../../components"
const user: CurrentUser = getCurrentUser()

const NotificationPage = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [notificationList, setNotificationList] = useState<ResNotification[]>(
    []
  )

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const resMyNotifications: void | any = await getMyNotifications(
        currentUser.uid
      )
      if (!unmounted) {
        setNotificationList(resMyNotifications)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])
  return (
    <div className="main-block">
      <h2 className="main-title blue-main-title">通知一覧</h2>
      <NotificationList<ResNotification> dataList={notificationList} />
      {/* <Pager fetchData={fetchData} dataNum={summariesNum} /> */}
    </div>
  )
}

export default NotificationPage

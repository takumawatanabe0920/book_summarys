import React, { useState, useEffect } from "react"
import { CurrentUser, ResNotification, ResultResponseList } from "../../types"
import { getCurrentUser, getMyNotifications } from "../../firebase/functions"
import { NotificationList, Pager } from "./../../components"
import { Paper, Tabs, Tab } from "./../../utils/material"
const user: CurrentUser = getCurrentUser()

const NotificationPage = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [notificationList, setNotificationList] = useState<ResNotification[]>(
    []
  )
  const [value, setValue] = React.useState(0)

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue)
  }

  const handleChangeTab = async (_tabType: string) => {
    const resMyNotifications: void | any = await getMyNotifications(
      currentUser.uid,
      _tabType
    )
    console.log(resMyNotifications)
    setNotificationList(resMyNotifications)
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const resMyNotifications: void | any = await getMyNotifications(
        currentUser.uid,
        "favorite"
      )
      console.log(resMyNotifications)
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
      <Paper className="tab-block">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className="tab-header"
        >
          <Tab label="お気に入り" onClick={() => handleChangeTab("favorite")} />
          <Tab
            label="コメント"
            onClick={() => handleChangeTab("summary_comment")}
          />
          <Tab
            label="運営会社から"
            onClick={() => handleChangeTab("company")}
          />
        </Tabs>
      </Paper>

      <NotificationList<ResNotification> dataList={notificationList} />
      {/* <Pager fetchData={fetchData} dataNum={summariesNum} /> */}
    </div>
  )
}

export default NotificationPage

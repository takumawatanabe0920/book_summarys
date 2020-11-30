import React, { useState, useEffect } from "react"
import { CurrentUser, ResNotification } from "../../types"
import {
  getCurrentUser,
  getMyNotifications,
  updateReadNotifications
} from "../../firebase/functions"
import { NotificationList, Pager } from "./../../components"
import { Paper, Tabs, Tab } from "./../../utils/material"
const user: CurrentUser = getCurrentUser()

const NotificationPage = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [notificationList, setNotificationList] = useState<ResNotification[]>(
    []
  )
  const [value, setValue] = React.useState(0)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue)
  }

  const handleChangeTab = async (_tabType: string) => {
    const resMyNotifications: void | any = await getMyNotifications(
      currentUser.id,
      _tabType
    )
    setNotificationList(resMyNotifications)
    updateReadNotifications(currentUser.id, _tabType)
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const resMyNotifications: void | any = await getMyNotifications(
          currentUser.id,
          "favorite"
        )
        setNotificationList(resMyNotifications)
      } catch (e) {}
    }

    loadData()
  }, [])
  return (
    <>
      {loading && (
        <div className="notification-content">
          <div className="main-block _block-center">
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
                <Tab
                  label="お気に入り"
                  onClick={() => handleChangeTab("favorite")}
                />
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
          </div>
        </div>
      )}
    </>
  )
}

export default NotificationPage

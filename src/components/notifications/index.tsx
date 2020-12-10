import React, { useState, useEffect, useContext } from "react"
import { ResNotification } from "../../types"
import {
  getMyNotifications,
  updateReadNotifications
} from "../../firebase/functions"
import { NotificationList } from "./../../components"
import { Paper, Tabs, Tab } from "./../../utils/material"
import { GlobalContext } from "./../../assets/hooks/context/Global"

const NotificationPage = () => {
  const [notificationList, setNotificationList] = useState<ResNotification[]>(
    []
  )
  const [value, setValue] = React.useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const { currentUser, notificationCount, setNotificationCount } = useContext(
    GlobalContext
  )

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue)
  }

  const handleChangeTab = async (_tabType: string) => {
    const resMyNotifications: void | any = await getMyNotifications(
      currentUser.id,
      _tabType
    )
    setNotificationList(resMyNotifications)
    let resCount: number = await updateReadNotifications(
      currentUser.id,
      _tabType
    )
    console.log(resCount)
    console.log(notificationCount)
    setNotificationCount(notificationCount - resCount)
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
          <div className="md-container">
            <div className="main-block _block-center">
              <h2 className="main-title blue-main-title">通知</h2>
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
        </div>
      )}
    </>
  )
}

export default NotificationPage

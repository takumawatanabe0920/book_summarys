import React from "react"
import { NotificationItem } from "./../../components"

interface Props<T> {
  dataList: T[]
}

interface PropsData {
  id?: string
}

function NotificationList<T extends PropsData>(props: Props<T>): JSX.Element {
  const { dataList } = props
  return (
    <>
      <div className="notification-list">
        {dataList.length > 0 ? (
          dataList.map((data: T) => {
            return <NotificationItem<T> key={data.id} data={data} />
          })
        ) : (
          <div className="_txt">通知は届いておりません。</div>
        )}
        {/* {dataList.map((data: T) => {
          return <NotificationItem<T> key={data.id} data={data} />
        })} */}
      </div>
    </>
  )
}

export default NotificationList

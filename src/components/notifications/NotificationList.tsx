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
  console.log(dataList)
  return (
    <>
      <div className="notification-list">
        {dataList.map((data: T) => {
          return <NotificationItem<T> key={data.id} data={data} />
        })}
        {/* {dataList.map((data: T) => {
          return <NotificationItem<T> key={data.id} data={data} />
        })} */}
      </div>
    </>
  )
}

export default NotificationList

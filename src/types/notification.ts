import React from "react"

export type Notification = Partial<{
  user_id: string
  user_name: string
  type: "favorite" | "company" | "summary_comment"
  target_id: any
  create_date: firebase.firestore.Timestamp
  update_date: firebase.firestore.Timestamp
  is_read: boolean
}>

export type ResNotification = Notification & {
  id?: string
}

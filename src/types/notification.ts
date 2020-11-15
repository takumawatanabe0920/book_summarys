import React from "react"

export type Notification = Partial<{
  user_id: string
  type: "favorite" | "company" | "summary_comment"
  target_id: string
  create_date: number
  update_date: number
}>

export type ResNotification = Notification & {
  id?: string
}

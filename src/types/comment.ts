import React from "react"

export type SummaryComment = Partial<{
  comment: string
  user_id: any
  user_name: string
  summary_id: any
  create_date: firebase.firestore.Timestamp
  update_date: firebase.firestore.Timestamp
}>

export type ResSummaryComment = SummaryComment & {
  id?: string
}

import React from "react"
import { ResSummaryBook } from "./summary"

export type Browsing = Partial<{
  user_id: string
  user_name: string
  summary_id: string
  create_date: firebase.firestore.Timestamp
  update_date: firebase.firestore.Timestamp
}>

export type ResBrowsing = Partial<{
  id: string
  user_id: string
  user_name: string
  summary_id: ResSummaryBook
  create_date: firebase.firestore.Timestamp
  update_date: firebase.firestore.Timestamp
}>

import React from "react"
import { ResSummaryBook } from "./summary"

export type Browsing = Partial<{
  user_id: string
  summary_id: string
  create_date: number
  update_date: number
}>

export type ResBrowsing = Partial<{
  id: string
  user_id: string
  summary_id: ResSummaryBook
  create_date: number
  update_date: number
}>

import React from "react"
import { ResSummaryBook } from "../../types/summary"

export type Browsing = Partial<{
  user_id: string
  summary_id: string
  create_date: number
  update_date: number
}>

export type ResBrowsing = Browsing & {
  id?: string
  summary_id?: ResSummaryBook
}

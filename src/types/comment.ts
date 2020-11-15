import React from "react"

export type SummaryComment = Partial<{
  comment: string
  user_id: string
  summary_id: string
  create_date: number
  update_date: number
}>

export type ResSummaryComment = SummaryComment & {
  id?: string
}

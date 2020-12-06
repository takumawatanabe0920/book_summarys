import React from "react"

export type SummaryComment = Partial<{
  comment: string
  user_id: any
  user_name: string
  summary_id: any
  create_date: number
  update_date: number
}>

export type ResSummaryComment = SummaryComment & {
  id?: string
}

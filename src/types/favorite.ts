import React from "react"

export type Favorite = Partial<{
  user_id: string
  user_name: string
  summary_id: any
  create_date: number
  update_date: number
}>

export type ResFavorite = Favorite & {
  id?: string
}

import React from "react"

export type Favorite = Partial<{
  user_id: string
  summary_id: string
  create_date: number
  update_date: number
}>

export type ResFavorite = Favorite & {
  id?: string
}

import React from "react"

export type Favorite = Partial<{
  user_id: string
  user_name: string
  summary_id: any
  create_date: firebase.firestore.Timestamp
  update_date: firebase.firestore.Timestamp
}>

export type ResFavorite = Favorite & {
  id?: string
}

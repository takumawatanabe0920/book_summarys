import React, { FC } from "react"

export type Favorite = Partial<{
  user_id: string
  summary_id: string
}>

export type ResFavorite = Favorite & {
  id?: string
}

import React, { FC } from "react"
import { deflate } from "zlib"

//要約スキーマ
export type SummaryBook = Partial<{
  title: string
  content: string
  category: string
  sub_category: string
  author: string
  price: string
  review: string
  product_links: string
  user_id: string
}>

export type Category = Partial<{
  name: string
  slug: string
}>

export type SubCategory = Partial<{
  category_id: string
  name: string
  slug: string
}>

export type ResSummaryBook = SummaryBook & {
  id?: string
}

export type ResCategory = Category & {
  id?: string
}

export type ResSubCategory = SubCategory & {
  id?: string
}

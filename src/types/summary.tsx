import React, { FC } from "react"
import { deflate } from "zlib"

//要約スキーマ
export type SummaryBook = Partial<{
  title: number
  content: string
  category: string
  sub_category: string
  author: string
  price: string
  review: string
  product_links: string
}>

export type Categories = Partial<{
  id: string
  name: string
  slug: string
}>

export type SubCategories = Partial<{
  id: string
  category_id: string
  name: string
  slug: string
}>

export type ResSummaryData = {
  id: string
  values: SummaryBook
}

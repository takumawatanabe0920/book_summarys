import React from "react"

export type ResultResponse<T> = Partial<{
  id: string
  status: number
  data: T
  error: any
}>

export type ResultResponseList<T> = Partial<{
  data: T[]
  error: any
  status: number
}>

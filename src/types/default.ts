import React from "react"

export type ResultResponse<T> = Partial<{
  status: number
  data: T
  error: any
}>

export type ResultResponseList<T> = Partial<{
  data: T[]
  error: any
  status: number
}>

import React from "react"
import dayjs from "dayjs"
import { useLocation } from "react-router-dom"

export const readQuery = (key?: string): string => {
  return new URLSearchParams(useLocation().search).get(key)
}

export const formatDateHour = (_datetime?: number): string => {
  return _datetime ? dayjs.unix(_datetime).format("YYYY-MM-DD HH:mm:ss") : ""
}

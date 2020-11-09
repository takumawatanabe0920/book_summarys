import React from "react"
import { useLocation } from "react-router-dom"

export const readQuery = (key?: string): string => {
  return new URLSearchParams(useLocation().search).get(key)
}

import React from "react"
import dayjs from "dayjs"

export const formatUpdateDate = (_datetime: number) => {
  let messageTime = _datetime ? dayjs.unix(_datetime).format("MM/DD") : ""
  let now = new Date()
  let nowTime = Math.floor(now.getTime() / 1000)
  let diffTime = nowTime - _datetime
  let diffDays = Math.floor(diffTime / 86400)

  diffTime -= diffDays * 86400
  let diffHours = Math.floor(diffTime / 3600) % 24
  diffTime -= diffHours * 3600
  let diffMinutes = Math.floor(diffTime / 60) % 60
  diffTime -= diffMinutes * 60
  let diffSeconds = diffTime % 60

  if (diffDays >= 7) {
    return messageTime
  } else if (0 < diffDays) {
    return `${diffDays}日前`
  } else if (diffDays === 0) {
    if (diffHours > 0) {
      return `${diffHours}時間前`
    } else {
      return `${diffMinutes}分前`
    }
  }
}

export const formatTagColor = (_categoryName: string): string => {
  switch (_categoryName) {
    case "スポーツ":
      return "sport-tag"
    case "自然界":
      return "nature-tag"
    case "小説":
      return "novel-tag"
    case "ビジネス":
      return "business-tag"
    case "雑誌":
      return "magazin-tag"
    default:
      return "all-tag"
  }
}

export const createUniqueStr = () => {
  const number = 1000
  return (
    new Date().getTime().toString(16) +
    Math.floor(number * Math.random()).toString(16)
  )
}

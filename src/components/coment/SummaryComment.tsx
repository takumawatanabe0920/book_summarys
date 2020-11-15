import React, { useState, useEffect } from "react"
import { ResSummaryComment } from "../../types"
import { CommentList } from "./../../components"

interface Props<T> {
  dataList: T[]
}

function SummaryComment<T>(props: Props<T>): JSX.Element {
  const { dataList } = props

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!unmounted) {
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="comment_main">
        <div className="main-block">
          <CommentList<T> dataList={dataList} />
        </div>
      </div>
    </>
  )
}

export default SummaryComment

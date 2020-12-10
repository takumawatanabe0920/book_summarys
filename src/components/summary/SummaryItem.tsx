import React, { FC } from "react"
import { ResSummaryBook } from "../../types"
import { MediaCard } from "../../utils/material"
import { SummaryStackItem } from "../"

type Props = {
  data: ResSummaryBook
  setting?: any
  elType?: string
  articleType?: string
}

const SummaryItem: FC<Props> = props => {
  const { data, setting, elType, articleType } = props

  return (
    <>
      {articleType === "stack" ? (
        <SummaryStackItem data={data} />
      ) : (
        <MediaCard data={data} setting={setting} elType={elType} />
      )}
    </>
  )
}

export default SummaryItem

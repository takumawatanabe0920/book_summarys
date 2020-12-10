import React, { FC } from "react"
import clsx from "clsx"
import { SummaryItem } from "./../../components"
import { ResSummaryBook } from "./../../types"

type Props = {
  dataList: ResSummaryBook[]
  articleType?: string
}

const SummaryList: FC<Props> = props => {
  const { dataList, articleType } = props

  return (
    <div className={clsx("data-list", `${articleType && "_stack-list"}`)}>
      {dataList.map((data: ResSummaryBook) => {
        return (
          <SummaryItem key={data.id} data={data} articleType={articleType} />
        )
      })}
    </div>
  )
}

export default SummaryList

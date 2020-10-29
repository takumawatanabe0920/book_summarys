import React, { FC } from "react"
import SummaryItem from "./SummaryItem"
import { ResSummaryData } from "./../../types/summary"

type Props = {
  dataList: ResSummaryData[]
}

const SummaryList: FC<Props> = props => {
  const { dataList } = props
  return (
    <>
      <div className="data-list">
        {dataList.map((data: ResSummaryData) => {
          return <SummaryItem key={data.id} data={data} />
        })}
      </div>
    </>
  )
}

export default SummaryList

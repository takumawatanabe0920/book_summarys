import React, { FC } from "react"
import { SummaryItem } from "./../../components"
import { ResSummaryBook } from "./../../types"

type Props = {
  dataList: ResSummaryBook[]
}

const SummaryList: FC<Props> = props => {
  const { dataList } = props
  //console.log(dataList)
  return (
    <>
      <div className="data-list">
        {dataList.map((data: ResSummaryBook) => {
          return <SummaryItem key={data.id} data={data} />
        })}
      </div>
    </>
  )
}

export default SummaryList

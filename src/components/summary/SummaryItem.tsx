import React, { FC } from "react"
import { Link } from "react-router-dom"
import { ResSummaryData } from "../../types/summary"

type Props = {
  data: ResSummaryData
}

const SummaryItem: FC<Props> = props => {
  const { data } = props
  console.log(data)
  return (
    <>
      <Link to={`/summary/${data.id}`} className="data-item">
        <div className="_thumnail">
          <img src={`${process.env.PUBLIC_URL}/images/izumi-img.jpg`} />
        </div>
        <h3 className="_summary-ttl">{data.values.title}</h3>
        <p className="_summary-txt">{data.values.author}</p>
      </Link>
    </>
  )
}

export default SummaryItem

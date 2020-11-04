import React, { FC } from "react"
import { Link } from "react-router-dom"
import { ResSummaryBook } from "../../types/summary"
import articleImg from "../../static/images/izumi-img.jpg"
import FavoliteButton from "./../common/parts/FavoliteButton"

type Props = {
  data: ResSummaryBook
}

const SummaryItem: FC<Props> = props => {
  const { data } = props

  return (
    <>
      <Link to={`/summary/${data.id}`} className="data-item">
        <div className="_thumnail">
          <img src={articleImg} />
        </div>
        <h3 className="_summary-ttl">{data.title}</h3>
        <p className="_summary-txt">{data.author}</p>
        <FavoliteButton user_id={data.user_id} summary_id={data.id} />
      </Link>
    </>
  )
}

export default SummaryItem

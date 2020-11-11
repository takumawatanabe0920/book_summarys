import React, { FC, useState } from "react"
import { Link } from "react-router-dom"
import { ResSummaryBook } from "../../types/summary"
import { CurrentUser } from "../../types/user"
import articleImg from "../../static/images/izumi-img.jpg"
import FavoliteButton from "../common/parts/FavoriteButton"
import functions from "../../utils/functions"
const { getCurrentUser } = functions
const user: CurrentUser = getCurrentUser()

type Props = {
  data: ResSummaryBook
}

const SummaryItem: FC<Props> = props => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const { data } = props

  return (
    <>
      <Link to={`/summary/${data.id}`} className="data-item">
        <div className="_thumnail">
          <img src={articleImg} />
        </div>
        <div className="_txt-box">
          <h3 className="_summary-ttl">{data.title}</h3>
          <p className="_summary-txt">{data.author}</p>
          <FavoliteButton user_id={currentUser.uid} summary_id={data.id} />
        </div>
      </Link>
    </>
  )
}

export default SummaryItem

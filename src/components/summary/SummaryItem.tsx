import React, { FC, useState } from "react"
import { Link } from "react-router-dom"
import { ResSummaryBook, CurrentUser } from "../../types"
import articleImg from "../../static/images/izumi-img.jpg"
import { FavoriteButton } from "./../../components"
import { getCurrentUser } from "../../firebase/functions"
import { MediaCard } from "../../utils/material"
const user: CurrentUser = getCurrentUser()

type Props = {
  data: ResSummaryBook
}

const SummaryItem: FC<Props> = props => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const { data } = props

  return <MediaCard data={data} />
}

export default SummaryItem

import React, { FC, useState } from "react"
import { ResSummaryBook, CurrentUser } from "../../types"
import { getCurrentUser } from "../../firebase/functions"
import { MediaCard } from "../../utils/material"
import { settings } from "cluster"
const user: CurrentUser = getCurrentUser()

type Props = {
  data: ResSummaryBook
  setting?: any
  columnNum?: string
}

const SummaryItem: FC<Props> = props => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const { data, setting, columnNum } = props

  return <MediaCard data={data} setting={setting} columnNum={columnNum} />
}

export default SummaryItem

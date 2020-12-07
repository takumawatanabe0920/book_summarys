import React, { FC, useState } from "react"
import { ResSummaryBook, ResUser as CurrentUser } from "../../types"
import { getCurrentUser } from "../../firebase/functions"
import { MediaCard } from "../../utils/material"
import { settings } from "cluster"
const user: CurrentUser = getCurrentUser()

type Props = {
  data: ResSummaryBook
  setting?: any
  columnNum?: string
  elType?: string
}

const SummaryItem: FC<Props> = props => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const { data, setting, columnNum, elType } = props

  return (
    <MediaCard
      data={data}
      setting={setting}
      columnNum={columnNum}
      elType={elType}
    />
  )
}

export default SummaryItem

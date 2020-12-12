import React, { useState, FC } from "react"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "query-string"
import { readQuery } from "../../../firebase/functions"

type props = {
  fetchPager: any
  dataNum: number
  dataNumPerPage: number
}

const Pager: FC<props> = props => {
  const [page, setPage] = useState(Number(readQuery("pages") || 1))

  const { fetchPager, dataNum, dataNumPerPage } = props
  const history = useHistory()
  let path = useLocation().pathname
  const location = useLocation()

  const updateData = (num?: number) => {
    setPage(num)
    let searchParams: { pages?: number } = {}
    searchParams.pages = num
    let searchQuery = queryString.stringify(searchParams)
    const queryPath = location.search.replace(/[?&]+\pages=\d+/gi, "")
    if (location && !queryPath.match(/[?]/)) {
      history.push(`${`${path}`}?${`${queryPath}&`}${searchQuery}`)
    } else if (queryPath.match(/[?]/)) {
      history.push(`${`${path}`}${`${queryPath}&`}${searchQuery}`)
    } else {
      history.push(`${`${path}?`}${searchQuery}`)
    }
    fetchPager(num)
  }

  const prevNum = () => {
    let prevNum = page - 1
    if (!(prevNum > 0)) {
      return ""
    } else {
      return (
        <div className="pager-num" onClick={() => updateData(prevNum)}>
          <p>{prevNum}</p>
        </div>
      )
    }
  }

  const nextNum = () => {
    let nextNum = page + 1
    if (nextNum > Math.ceil(dataNum / dataNumPerPage)) {
      return ""
    } else {
      return (
        <div className="pager-num" onClick={() => updateData(nextNum)}>
          <p>{nextNum}</p>
        </div>
      )
    }
  }

  return (
    <>
      <div className="pager">
        {prevNum()}
        <div className="pager-num active">
          <p>{page}</p>
        </div>
        {nextNum()}
      </div>
    </>
  )
}

export default Pager

import React, { useEffect, useState, FC } from "react"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "query-string"

type props = {
  fetchPager: any
  dataNum: number
}

const Pager: FC<props> = props => {
  const [page, setPage] = useState(1)

  const { fetchPager, dataNum } = props
  const history = useHistory()
  let path = useLocation().pathname
  const location = useLocation()

  const updateData = (num?: number) => {
    setPage(num)
    let searchParams: { pages?: number } = {}
    searchParams.pages = num
    let searchQuery = queryString.stringify(searchParams)
    if (location && location.search) {
      history.push(`${path}${location.search}&${searchQuery}`)
    } else {
      history.push(`${path}?${searchQuery}`)
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
    if (nextNum > Math.ceil(dataNum / 6)) {
      return ""
    } else {
      return (
        <div className="pager-num" onClick={() => updateData(nextNum)}>
          <p>{nextNum}</p>
        </div>
      )
    }
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!unmounted) {
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

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

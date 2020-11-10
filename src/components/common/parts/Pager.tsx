import React, { useEffect, useState, FC } from "react"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "query-string"

type props = {
  fetchData: any
  dataNum: number
}

const Pager: FC<props> = props => {
  const [page, setPage] = useState(1)

  const { fetchData, dataNum } = props
  const history = useHistory()
  let path = useLocation().pathname

  const updateData = (num?: number) => {
    setPage(num)
    let searchParams: { pages?: number } = {}
    searchParams.pages = num
    let searchQuery = queryString.stringify(searchParams)
    history.push(`${path}?${searchQuery}`)
    fetchData(num)
  }

  const prevNum = () => {
    let prevNum = page - 1
    if (!(prevNum > 0)) {
      return ""
    } else {
      return (
        <a className="prev" onClick={() => updateData(prevNum)}>
          {prevNum}
        </a>
      )
    }
  }

  const nextNum = () => {
    let nextNum = page + 1
    if (nextNum >= Math.ceil(dataNum / 6)) {
      return ""
    } else {
      return (
        <a className="next" onClick={() => updateData(nextNum)}>
          {nextNum}
        </a>
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
      <div>
        {prevNum()}
        <p className="num">{page}</p>
        {nextNum()}
      </div>
    </>
  )
}

export default Pager

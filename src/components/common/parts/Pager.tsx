import React, { useEffect, useState, FC } from "react"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "query-string"

const Pager: React.FunctionComponent<{ fetchData: any }> = ({ fetchData }) => {
  const [page, setPage] = useState(0)
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
        <a className="prev" onClick={() => updateData(1)}>
          {1}
        </a>
        <p className="num">{2}</p>
        <a className="next" onClick={() => updateData(3)}>
          {3}
        </a>
      </div>
    </>
  )
}

export default Pager

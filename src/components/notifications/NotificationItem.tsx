import React, { useState } from "react"
import { Link } from "react-router-dom"

interface Props<T> {
  data: T
}

interface PropsData {
  id?: string
  // title?: string
  // author?: string
}

function SummaryItem<T extends PropsData>(props: Props<T>): JSX.Element {
  const { data } = props
  console.log(data)

  return (
    <>
      <Link to={`/summary/${data.id}`} className="data-item">
        <div className="_txt-box">
          {/* <h3 className="_summary-ttl">{data.title}</h3>
          <p className="_summary-txt">{data.author}</p> */}
        </div>
      </Link>
    </>
  )
}

export default SummaryItem

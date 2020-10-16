import React from "react"
// components
import Sidebar from "./layouts/Sidebar"

// sections

const IndexPage = () => {
  return (
    <>
      <div className="l-main">
        <div className="main-block">
          <h2>要約一覧</h2>
          <p>記事一覧です。</p>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default IndexPage

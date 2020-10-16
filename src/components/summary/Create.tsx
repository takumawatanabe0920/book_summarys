import React from "react"
import { Link } from "react-router-dom"
import Sidebar from "../layouts/Sidebar"
import SummaryForm from "../common/form/SummaryForm"

const CreatePage = () => {
  return (
    <>
      <div className="summary_main">
        <div className="main-block">
          <Link to="/">一覧へ戻る</Link>
          <SummaryForm />
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default CreatePage

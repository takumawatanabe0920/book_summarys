import React from "react"
import { Link } from "react-router-dom"
import Sidebar from "../layouts/Sidebar"
import SammaryForm from "../common/form/SammaryForm"

function CreatePage() {
  return (
    <>
      <div className="summary_main">
        <div className="main-block">
          <Link to="/">一覧へ戻る</Link>
          <SammaryForm />
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default CreatePage

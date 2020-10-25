import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import firebase from "./../../firebase/config.jsx"
const db = firebase.firestore()
import Sidebar from "../layouts/Sidebar"
import { SummaryBook, Category, SubCategory } from "./../../types/summary"
import {
  getCategory,
  getSubCategory,
  getSummaryBook
} from "../../utils/functions"

const ShowPage = () => {
  const [summarybook, setSummaryBook] = useState<SummaryBook>({})
  //const [category, setCategory] = useState<Category>({})
  //const [subCategory, setSubCategory] = useState<SubCategory>({})

  const url: { id: string } = useParams()

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const resSummaryBook = await getSummaryBook(url.id)
      const resCategory = await getCategory(resSummaryBook.category)
      const resSubCategory = await getSubCategory(resSummaryBook.sub_category)
      if (!unmounted) {
        setSummaryBook(resSummaryBook)
        // setCategory(resCategory)
        // setSubCategory(resSubCategory)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="summary_main">
        <div className="main-block">
          <Link to="/">一覧へ戻る</Link>
          <div className="prof-area">
            <div className="_icon">
              <img src="" alt="" />
            </div>
            <div className="_icon">渡辺拓馬</div>
          </div>
          <div className="summary-show">
            <div className="_header">
              <h1 className="main-title">{summarybook.title}</h1>
              <div className="tags">
                {/* <span className="tag">{category}</span>
                <span className="tag">{subCategory}</span> */}
              </div>
            </div>
            <div className="_body">
              <p className="_txt">{summarybook.content}</p>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default ShowPage

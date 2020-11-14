import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Sidebar from "../layouts/Sidebar"
import {
  ResSummaryBook,
  Category,
  SubCategory,
  CurrentUser,
  ResBrowsing
} from "../../types"
import SummaryDetails from "./parts/SummaryDetails"
import {
  getSummaryBook,
  getCategory,
  getSubCategory,
  createBrowsing,
  getCurrentUser,
  getMyBrowsing
} from "../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const SummaryShowPage = () => {
  const [summarybook, setSummaryBook] = useState<ResSummaryBook>({})
  const [category, setCategory] = useState<Category>({})
  const [subCategory, setSubCategory] = useState<SubCategory>({})

  const url: { id: string } = useParams()

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const resSummaryBook: void | any = await getSummaryBook(url.id)
      const resCategory: void | any = await getCategory(resSummaryBook.category)
      let resSubCategory: void | any = ""
      if (resSummaryBook.sub_category) {
        resSubCategory = await getSubCategory(resSummaryBook.sub_category)
      }

      if (url && url.id && user) {
        const browsing = { summary_id: url.id, user_id: user.uid }
        let [res]: ResBrowsing[] = await getMyBrowsing(browsing.user_id)
        if (!res || res.summary_id.id !== browsing.summary_id) {
          //すぐにfirebaseに反映されないため、遅延処理を入れたい
          createBrowsing(browsing)
        }
      }
      if (!unmounted) {
        setSummaryBook(resSummaryBook)
        setCategory(resCategory)
        setSubCategory(resSubCategory)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="summary_main">
        <SummaryDetails
          summaryBook={summarybook}
          category={category}
          subCategory={subCategory}
        />
        <Sidebar />
      </div>
    </>
  )
}

export default SummaryShowPage

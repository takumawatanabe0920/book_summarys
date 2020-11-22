import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  ResSummaryBook,
  Category,
  SubCategory,
  CurrentUser,
  ResBrowsing,
  SummaryComment as SummaryCommentType,
  ResSummaryComment,
  ResultResponseList
} from "../../types"
import {
  SummaryDetails,
  SummaryComment,
  SummaryCommentForm,
  Sidebar
} from "./../../components"
import {
  getSummaryBook,
  getCategory,
  getSubCategory,
  createBrowsing,
  getCurrentUser,
  getMyBrowsings,
  getSummaryComment
} from "../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const SummaryShowPage = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [summarybook, setSummaryBook] = useState<ResSummaryBook>({})
  const [category, setCategory] = useState<Category>({})
  const [subCategory, setSubCategory] = useState<SubCategory>({})
  const [summaryCommentList, setSummaryCommentList] = useState<
    ResSummaryComment[]
  >([])

  const slug: { id: string } = useParams()

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const resSummaryBook: void | any = await getSummaryBook(slug.id)
      const resCategory: void | any = await getCategory(resSummaryBook.category)
      let resSubCategory: void | any = ""
      if (resSummaryBook.sub_category) {
        resSubCategory = await getSubCategory(resSummaryBook.sub_category)
      }
      const resSummaryCommentList: ResultResponseList<ResSummaryComment> = await getSummaryComment(
        slug.id
      )

      if (slug && slug.id && currentUser) {
        const browsing = { summary_id: slug.id, user_id: currentUser.uid }
        let [res]: ResBrowsing[] = await getMyBrowsings(browsing.user_id)
        if (
          !res ||
          (res && res.summary_id && res.summary_id.id !== browsing.summary_id)
        ) {
          createBrowsing(browsing)
        }
      }
      if (!unmounted) {
        setSummaryBook(resSummaryBook)
        setCategory(resCategory)
        setSubCategory(resSubCategory)
        if (resSummaryCommentList && resSummaryCommentList.status === 200) {
          setSummaryCommentList(resSummaryCommentList.data)
        }
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
          <SummaryDetails
            summaryBook={summarybook}
            category={category}
            subCategory={subCategory}
          />
          <SummaryComment<ResSummaryComment> dataList={summaryCommentList} />
          {user.uid ? (
            <SummaryCommentForm
              slug={slug}
              user_id={user.uid}
              summary_id={slug.id}
            />
          ) : (
            <p>ログインをしてからコメントをしよう</p>
          )}
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default SummaryShowPage

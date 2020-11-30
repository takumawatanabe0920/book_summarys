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
  ResultResponseList,
  ResultResponse,
  ResCategory,
  ResSubCategory,
  SummaryBook
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
  const [loading, setLoading] = useState<boolean>(false)

  const slug: { id: string } = useParams()

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const resSummaryBook: ResultResponse<ResSummaryBook> = await getSummaryBook(
          slug.id
        )
        const resCategory: ResultResponse<ResCategory> = await getCategory(
          resSummaryBook.data.category
        )
        let resSubCategory: ResultResponse<ResSubCategory>
        if (resSummaryBook.data.sub_category) {
          resSubCategory = await getSubCategory(
            resSummaryBook.data.sub_category
          )
        }
        const resSummaryCommentList: ResultResponseList<ResSummaryComment> = await getSummaryComment(
          slug.id
        )

        if (slug && slug.id && currentUser) {
          const browsing = {
            summary_id: slug.id,
            user_id: currentUser.id,
            user_name: currentUser.displayName ? currentUser.displayName : ""
          }
          let [res]: ResBrowsing[] = await getMyBrowsings(browsing.user_id)
          if (
            !res ||
            (res && res.summary_id && res.summary_id.id !== browsing.summary_id)
          ) {
            createBrowsing(browsing)
          }
        }

        if (resSummaryBook && resSummaryBook.status === 200) {
          setSummaryBook(resSummaryBook.data)
        }
        if (resCategory && resCategory.status === 200) {
          setCategory(resCategory.data)
        }
        if (resSubCategory && resSubCategory.status === 200) {
          setSubCategory(resSubCategory.data)
        }
        if (resSummaryCommentList && resSummaryCommentList.status === 200) {
          setSummaryCommentList(resSummaryCommentList.data)
        }
      } catch (e) {}
    }

    loadData()
  }, [])

  return (
    <>
      {loading && (
        <div className="summary_main">
          <div className="main-block">
            <SummaryDetails
              summaryBook={summarybook}
              category={category}
              subCategory={subCategory}
              currentUser={currentUser}
            />
            <SummaryComment<ResSummaryComment> dataList={summaryCommentList} />
            {user.id ? (
              <SummaryCommentForm
                slug={slug}
                user_id={user.id}
                summary_id={slug.id}
              />
            ) : (
              <p>ログインをしてからコメントをしよう</p>
            )}
          </div>
          <Sidebar />
        </div>
      )}
    </>
  )
}

export default SummaryShowPage

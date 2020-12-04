import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  ResSummaryBook,
  CurrentUser,
  ResBrowsing,
  SummaryComment as SummaryCommentType,
  ResSummaryComment,
  ResultResponseList,
  ResultResponse
} from "../../types"
import {
  SummaryDetails,
  SummaryComment,
  SummaryCommentForm,
  Sidebar
} from "./../../components"
import {
  getSummaryBook,
  createBrowsing,
  getCurrentUser,
  getMyBrowsings,
  getSummaryComment
} from "../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const SummaryShowPage = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [summarybook, setSummaryBook] = useState<ResSummaryBook>({})
  const [summaryCommentList, setSummaryCommentList] = useState<
    ResSummaryComment[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)

  const slug: { id: string } = useParams()

  useEffect(() => {
    const loadData = async () => {
      try {
        const resSummaryBook: ResultResponse<ResSummaryBook> = await getSummaryBook(
          slug.id
        )
        if (resSummaryBook && resSummaryBook.status === 200) {
          setSummaryBook(resSummaryBook.data)
        }
        setLoading(true)
      } catch (e) {}
    }
    loadData()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
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

        const resSummaryCommentList: ResultResponseList<ResSummaryComment> = await getSummaryComment(
          slug.id
        )
        if (resSummaryCommentList && resSummaryCommentList.status === 200) {
          setSummaryCommentList(resSummaryCommentList.data)
        }
      } catch (e) {}
    }
    loadData()
  }, [summaryCommentList])

  return (
    <>
      {loading && (
        <div className="summary_main">
          <div className="main-block">
            <SummaryDetails
              summaryBook={summarybook}
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

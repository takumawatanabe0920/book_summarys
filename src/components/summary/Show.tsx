import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import {
  ResSummaryBook,
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
  getSummaryBookPopulate,
  createBrowsing,
  getMyBrowsings,
  getSummaryComments
} from "../../firebase/functions"
import { GlobalContext } from "./../../assets/hooks/context/Global"

const SummaryShowPage = () => {
  const [summarybook, setSummaryBook] = useState<ResSummaryBook>({})
  const [summaryCommentList, setSummaryCommentList] = useState<
    ResSummaryComment[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)
  const { currentUser, setCurrentUser } = useContext(GlobalContext)

  const slug: { id: string } = useParams()

  const publicSummary = (_type: string, user_id: string) => {
    if (_type === "public" || currentUser.id === user_id) {
      return (
        <div className="main-block article-block">
          <SummaryDetails summaryBook={summarybook} currentUser={currentUser} />
          <SummaryComment<ResSummaryComment> dataList={summaryCommentList} />
          {currentUser.id ? (
            <SummaryCommentForm
              slug={slug}
              user_id={currentUser.id}
              summary_id={slug.id}
            />
          ) : (
            <p>ログインをしてからコメントをしよう</p>
          )}
        </div>
      )
    } else if (_type === "private") {
      return (
        <div className="main-block article-block">
          <p className="publishing-text">この記事は非公開です。</p>
          <div className="mosaic">
            <SummaryDetails
              summaryBook={summarybook}
              currentUser={currentUser}
            />
            <SummaryComment<ResSummaryComment> dataList={summaryCommentList} />
            {currentUser.id ? (
              <SummaryCommentForm
                slug={slug}
                user_id={currentUser.id}
                summary_id={slug.id}
              />
            ) : (
              <p>ログインをしてからコメントをしよう</p>
            )}
          </div>
        </div>
      )
    }
  }

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

        const resSummaryCommentList: ResultResponseList<ResSummaryComment> = await getSummaryComments(
          slug.id
        )
        if (resSummaryCommentList && resSummaryCommentList.status === 200) {
          setSummaryCommentList(resSummaryCommentList.data)
        }

        const resSummaryBook: ResultResponse<ResSummaryBook> = await getSummaryBookPopulate(
          slug.id
        )
        if (resSummaryBook && resSummaryBook.status === 200) {
          setSummaryBook(resSummaryBook.data)
        }
        setLoading(true)
      } catch (e) {}
    }

    loadData()
  }, [slug])

  return (
    <>
      {loading && (
        <div className="summary_main">
          {publicSummary(summarybook.publishing_status, summarybook.user_id.id)}
          <Sidebar />
        </div>
      )}
    </>
  )
}

export default SummaryShowPage

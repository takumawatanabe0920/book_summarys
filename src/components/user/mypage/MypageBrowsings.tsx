import React, { useState, useEffect, useContext } from "react"
import useReactRouter from "use-react-router"
import { useParams } from "react-router-dom"
import { ResBrowsing, ResultResponseList } from "../../../types"
import { MypageSidebar, MypageSummaryStackItem, Pager } from "../.."
import {
  getMyBrowsings,
  getMyBrowsingsCount,
  readQuery
} from "../../../firebase/functions"
import { GlobalContext } from "../../../assets/hooks/context/Global"

const MypageBrowsings = () => {
  const [myBrowings, setMyBrowings] = useState<ResBrowsing[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState(Number(readQuery("pages") || 1))
  const [myBrowingsNum, setMyBrowingsNum] = useState(0)
  const [dataNumPerPage, setDataNumPerPager] = useState(12)
  const { currentUser, setCurrentUser } = useContext(GlobalContext)
  const { history } = useReactRouter()
  const url: { id: string } = useParams()

  const fetchPager = (num: number) => {
    console.log(num)
    setPage(num)
  }

  useEffect(() => {
    console.log("called")
    console.log(page)
    const loadData = async () => {
      setLoading(true)
      if (url.id !== currentUser.id) {
        history.push(`/mypage/${url.id}/home`)
      }
      try {
        if (url.id !== currentUser.id) {
          history.push(`/mypage/${url.id}/home`)
        }
        let resBrowing: ResultResponseList<ResBrowsing>
        if (currentUser) {
          resBrowing = await getMyBrowsings(
            dataNumPerPage,
            page,
            currentUser.id
          )
          if (resBrowing.status === 200) {
            setMyBrowings(resBrowing.data)
          }
        }
        const count: number = await getMyBrowsingsCount(currentUser.id)
        setMyBrowingsNum(count)
      } catch (e) {}
    }

    loadData()
  }, [page])

  return (
    <>
      {loading && (
        <div className="mypage_main">
          <div className="l-container">
            <div className="main-block _block-center">
              <div className="user-mypage">
                <h1 className="main-title blue-main-title">MY PAGE</h1>
                <div className="mypage-content">
                  <MypageSidebar user={currentUser} />
                  <div className="_mypage">
                    <h2 className="sub-ttl">閲覧履歴</h2>
                    {myBrowings &&
                      myBrowings.map((browsing: ResBrowsing) => {
                        return (
                          <MypageSummaryStackItem
                            data={browsing.summary_id}
                            time={browsing.update_date}
                          />
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MypageBrowsings

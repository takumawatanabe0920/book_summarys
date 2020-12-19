import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  ResultResponseList,
  ResFavorite,
  ResultResponse,
  ResUser
} from "../../../types"
import { MypageSidebar, MypageSummaryStackItem, Pager } from "../.."
import {
  getMyFavorites,
  getfavoriteNum,
  getIdUser,
  readQuery
} from "../../../firebase/functions"

const MypageFavorites = () => {
  const [user, setUser] = useState<ResUser>({})
  const [favorites, setFavorites] = useState<ResFavorite[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const slug: { id: string } = useParams()
  const [page, setPage] = useState(Number(readQuery("pages") || 1))
  const [myFavoritesNum, setMyFavoritesNum] = useState(0)
  const [dataNumPerPage, setDataNumPerPager] = useState(8)

  const fetchPager = (num: number) => {
    setPage(num)
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const resUser: ResultResponse<ResUser> = await getIdUser(slug.id)
        const resMyFavoritesDataList: ResultResponseList<ResFavorite> = await getMyFavorites(
          dataNumPerPage,
          page,
          slug.id
        )
        const resMyFavoritesCount: number = await getfavoriteNum([
          "user_id",
          slug.id
        ])
        setMyFavoritesNum(resMyFavoritesCount)
        if (resUser && resUser.status === 200) {
          setUser(resUser.data)
        }
        if (resMyFavoritesDataList && resMyFavoritesDataList.status === 200) {
          setFavorites(resMyFavoritesDataList.data)
        }
      } catch (e) {}
    }

    loadData()
  }, [page, slug])

  return (
    <>
      {loading && (
        <div className="mypage_main">
          <div className="l-container">
            <div className="main-block _block-center">
              <div className="user-mypage">
                <h1 className="main-title blue-main-title">MY PAGE</h1>
                <div className="mypage-content">
                  <MypageSidebar user={user} />
                  <div className="_mypage">
                    <h2 className="sub-ttl">いいねした記事一覧</h2>
                    {favorites &&
                      favorites.length > 0 &&
                      favorites.map((favorite: ResFavorite) => {
                        return (
                          <MypageSummaryStackItem data={favorite.summary_id} />
                        )
                      })}
                    <Pager
                      fetchPager={fetchPager}
                      dataNum={myFavoritesNum}
                      dataNumPerPage={dataNumPerPage}
                    />
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

export default MypageFavorites

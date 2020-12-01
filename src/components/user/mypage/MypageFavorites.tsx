import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  ResultResponseList,
  ResFavorite,
  ResultResponse,
  ResUser
} from "../../../types"
import { MypageSidebar, SummaryStackItem } from "../.."
import { getMyFavorites, getIdUser } from "../../../firebase/functions"

const MypageFavorites = () => {
  const [user, setUser] = useState<ResUser>({})
  const [favorites, setFavorites] = useState<ResFavorite[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const url: { id: string } = useParams()

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const resUser: ResultResponse<ResUser> = await getIdUser(url.id)
        const resMyFavoritesDataList: ResultResponseList<ResFavorite> = await getMyFavorites(
          url.id
        )
        if (resUser && resUser.status === 200) {
          setUser(resUser.data)
        }
        if (resMyFavoritesDataList && resMyFavoritesDataList.status === 200) {
          setFavorites(resMyFavoritesDataList.data)
        }
      } catch (e) {}
    }

    loadData()
  }, [])

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
                      favorites.map((favorite: ResFavorite) => {
                        return <SummaryStackItem data={favorite.summary_id} />
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

export default MypageFavorites

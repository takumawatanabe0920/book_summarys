import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { CurrentUser, ResultResponseList, ResFavorite } from "../../../types"
import { MypageSidebar, SummaryStackItem } from "../.."
import { getCurrentUser, getMyFavorites } from "../../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const MypageFavorites = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [favorites, setFavorites] = useState<ResFavorite[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const resMyFavoritesDataList: ResultResponseList<ResFavorite> = await getMyFavorites(
          currentUser.id
        )
        console.log(resMyFavoritesDataList)
        if (resMyFavoritesDataList && resMyFavoritesDataList.status === 200) {
          console.log(resMyFavoritesDataList)
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
                  <MypageSidebar user={currentUser} />
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

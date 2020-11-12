import React, { useEffect, useState, FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { Favorite, ResFavorite } from "../../../types/favorite"
import { CurrentUser } from "../../../types/user"
import functions from "../../../utils/functions"
import { number } from "prop-types"
const {
  getFavorite,
  createFavorite,
  deleteFavorite,
  getfavoriteNum,
  getCurrentUser,
  updateFavoriteSummaries
} = functions
const user: CurrentUser = getCurrentUser()

const FavoliteButton: FC<Favorite> = props => {
  const { user_id, summary_id } = props
  const [currentUserfavorites, setCurrentUserFavorites] = useState<ResFavorite>(
    {}
  )
  const [favorites, setFavorites] = useState<ResFavorite>({})
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [favoritesNum, setFavoritesNum] = useState(0)

  const handleFavorite = async (event: React.MouseEvent<HTMLElement>) => {
    event.persist()
    event.preventDefault()
    if (!user_id) {
      console.log("ログインしてください。")
      return
    }
    if (!summary_id) {
      console.log("記事がありません。")
      return
    }
    //レンダリングさせる必要がある
    if (Object.keys(currentUserfavorites).length > 0) {
      deleteFavorite(currentUserfavorites.id)
      updateFavoriteSummaries(currentUserfavorites.id, summary_id)
      setCurrentUserFavorites({})
      setFavoritesNum(favoritesNum - 1)
    } else {
      let newProps = { ...props }
      const id = await createFavorite(newProps)
      if (!id) {
        console.log("idが存在しません")
        return
      }
      updateFavoriteSummaries(id, summary_id)
      setCurrentUserFavorites({ id, ...props })
      setFavoritesNum(favoritesNum + 1)
    }
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const [favorite] = await getFavorite(currentUser.uid, summary_id)
      const count: number = await getfavoriteNum(summary_id)
      if (!unmounted) {
        if (favorite) {
          setCurrentUserFavorites(favorite)
        }
        setFavoritesNum(count)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="favolite-button" onClick={handleFavorite}>
        {Object.keys(currentUserfavorites).length > 0 ? (
          <FontAwesomeIcon icon={faHeart} className="clicked" />
        ) : (
          <FontAwesomeIcon icon={faHeart} />
        )}
      </div>
      <div>{favoritesNum}</div>
    </>
  )
}

export default FavoliteButton

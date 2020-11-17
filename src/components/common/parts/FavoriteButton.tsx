import React, { useEffect, useState, FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import {
  Favorite,
  ResFavorite,
  CurrentUser,
  ResultResponseList,
  ResultResponse,
  SummaryBook
} from "../../../types"
import {
  getFavorite,
  createFavorite,
  deleteFavorite,
  getfavoriteNum,
  getCurrentUser,
  updateFavoriteSummaries,
  createNotification
} from "../../../firebase/functions"
import { Alert } from "../../../components"
import useAlertState from "../../../assets/hooks/useAlertState"
import { number } from "prop-types"
const user: CurrentUser = getCurrentUser()

const FavoliteButton: FC<Favorite> = props => {
  const { user_id, summary_id } = props
  const [currentUserfavorites, setCurrentUserFavorites] = useState<ResFavorite>(
    {}
  )
  const [favorites, setFavorites] = useState<ResFavorite>({})
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [favoritesNum, setFavoritesNum] = useState(0)
  const [
    isShowAlert,
    alertStatus,
    alertText,
    throwAlert,
    closeAlert
  ] = useAlertState(false)

  const handleFavorite = async (event: React.MouseEvent<HTMLElement>) => {
    event.persist()
    event.preventDefault()
    if (!user_id) {
      return await throwAlert("danger", "ログインしてください。")
    }
    if (!summary_id) {
      return await throwAlert("danger", "記事が存在しません。")
    }
    //レンダリングさせる必要がある
    if (Object.keys(currentUserfavorites).length > 0) {
      const resDeleteFavorite: ResultResponse<SummaryBook> = await deleteFavorite(
        currentUserfavorites.id
      )
      if (resDeleteFavorite && resDeleteFavorite.status === 200) {
        updateFavoriteSummaries(currentUserfavorites.id, summary_id)
        setCurrentUserFavorites({})
        setFavoritesNum(favoritesNum - 1)
        await throwAlert("danger", "いいねを解除しました。")
      } else {
        await throwAlert("danger", "いいねの解除に失敗しました。")
      }
    } else {
      let newProps = { ...props }
      const resFavorite: ResultResponse<SummaryBook> = await createFavorite(
        newProps
      )
      if (resFavorite && resFavorite.status === 200) {
        updateFavoriteSummaries(resFavorite.id, summary_id)
        setCurrentUserFavorites({ id: resFavorite.id, ...props })
        setFavoritesNum(favoritesNum + 1)
        createNotification({ user_id, target_id: summary_id, type: "favorite" })
        await throwAlert("success", "いいねしました。")
      } else {
        await throwAlert("danger", "いいねに失敗しました。")
      }
    }
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!currentUser) return
      const resfavoriteList: ResultResponseList<ResFavorite> = await getFavorite(
        currentUser.uid,
        summary_id
      )
      if (!unmounted) {
        if (
          resfavoriteList &&
          resfavoriteList.status === 200 &&
          resfavoriteList.data.length > 0
        ) {
          setCurrentUserFavorites(resfavoriteList.data[0])
        }
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const count: number = await getfavoriteNum(summary_id)
      if (!unmounted) {
        setFavoritesNum(count)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <Alert
        is_show_alert={isShowAlert}
        alert_status={alertStatus}
        alert_text={alertText}
      />
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

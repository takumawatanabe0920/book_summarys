import React, { useEffect, useState, FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { Favorite } from "../../../types/favorite"
import functions from "../../../utils/functions"
const { getFavorite, createFavorite, deleteFavorite } = functions

type Props = {
  user_id: string
  summary_id: string
}

const FavoliteButton: FC<Props> = props => {
  const { user_id, summary_id } = props
  const [favorites, setFavorites] = useState<Favorite>({})
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
    console.log(favorites)
    // if (Object.keys(favorites).length >= 0) {
    //   console.log("called")
    //   //deleteFavorite(favorite.id)
    // } else {
    //   createFavorite(props)
    // }
    createFavorite(props)
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const favorite = await getFavorite(user_id, summary_id)
      console.log(favorite)
      if (!unmounted) {
        //setFavorites(favorite)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="favolite-button" onClick={handleFavorite}>
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faHeart} className="clicked" />
      </div>
    </>
  )
}

export default FavoliteButton

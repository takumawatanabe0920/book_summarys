import React, { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { ResSummaryBook, ResUser as CurrentUser } from "../../../types"
import { responseUploadImage } from "../../../firebase/functions"
import { formatUpdateDate } from "../../../utils/function"
import { FavoriteButton } from "../../../components"
import { ReadOnlyEditor } from "../../../utils/richtext"
import { FavoriteIcon } from "../../../utils/material"
import { userCircleIcon } from "../../../utils/icons"

type Props = {
  summaryBook: ResSummaryBook
  currentUser: CurrentUser
}

const SummaryDetails: FC<Props> = props => {
  const [userIcon, setUserIcon] = useState<string>("")
  const { summaryBook, currentUser } = props
  const {
    title,
    content,
    favorite_count,
    user_id,
    user_name,
    category,
    sub_category,
    update_date
  } = summaryBook
  const url: { id: string } = useParams()

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user_id && user_id.photoURL) {
          const resUserIcon: string = await responseUploadImage(
            user_id.photoURL
          )
          setUserIcon(resUserIcon)
        }
      } catch (e) {}
    }
    loadData()
  }, [userIcon])

  return (
    <>
      <div className="prof-area">
        <Link to={`/mypage/${user_id.id}/home`} className="_user-icon-area">
          <div className="_icon">
            <img src={userIcon ? userIcon : userCircleIcon} alt="ロゴ" />
          </div>
          <p className="_user-txt">{user_name}</p>
        </Link>
        <div className="_update-date">
          <p>{formatUpdateDate(update_date)}に更新</p>
        </div>
      </div>
      <div className="summary-show">
        <div className="_header">
          <h1 className="main-title blue-main-title">{title}</h1>
          <div className="tags">
            {/* TODO リンク：カテゴリー記事に飛ばす */}
            <span className="tag">{category.name}</span>
            {sub_category.name && (
              <span className="tag">{sub_category.name}</span>
            )}
          </div>
          <div className="_icons">
            <div className="favorite-area">
              <FavoriteIcon className="favorite-button isClick" />
              <p className="favoriteNum">
                {favorite_count ? favorite_count : 0}
              </p>
            </div>
            {/* TODO: snsボタンを設置 */}
          </div>
        </div>
        <div className="_body">
          <ReadOnlyEditor editorState={content} />
          <div className="_favorite-area">
            <FavoriteButton user_id={currentUser.id} summary_id={url.id} />
          </div>
        </div>
      </div>
    </>
  )
}

export default SummaryDetails

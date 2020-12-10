import React, { FC, useState } from "react"
import { useParams } from "react-router-dom"
import { ResSummaryBook, ResUser as CurrentUser } from "../../../types"
import { formatUpdateDate } from "../../../utils/function"
import { FavoriteButton, UserIcon } from "../../../components"
import { ReadOnlyEditor } from "../../../utils/richtext"
import { FavoriteIcon } from "../../../utils/material"

type Props = {
  summaryBook: ResSummaryBook
  currentUser: CurrentUser
}

const SummaryDetails: FC<Props> = props => {
  const { summaryBook, currentUser } = props
  const {
    title,
    content,
    favorite_count,
    user_id,
    category,
    sub_category,
    update_date
  } = summaryBook
  const url: { id: string } = useParams()

  return (
    <>
      <div className="prof-area">
        <UserIcon user_id={user_id} />
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

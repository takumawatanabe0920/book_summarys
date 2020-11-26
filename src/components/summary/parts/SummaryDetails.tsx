import React, { FC } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import {
  ResSummaryBook,
  Category,
  SubCategory,
  CurrentUser
} from "../../../types"
import { FavoriteButton } from "../../../components"
import { ReadOnlyEditor } from "../../../utils/richtext"
import { FavoriteIcon } from "../../../utils/material"

type Props = {
  summaryBook: ResSummaryBook
  category: Category
  subCategory: SubCategory
  currentUser: CurrentUser
}

const SummaryDetails: FC<Props> = props => {
  const { summaryBook, category, subCategory, currentUser } = props
  const url: { id: string } = useParams()

  return (
    <>
      <div className="prof-area">
        <div className="_icon">
          <img src="" alt="" />
        </div>
        <Link to={`/user/${summaryBook.user_id}`} className="_icon">
          渡辺拓馬
        </Link>
      </div>
      <div className="summary-show">
        <div className="_header">
          <h1 className="main-title blue-main-title">{summaryBook.title}</h1>
          <div className="tags">
            {/* TODO リンク：カテゴリー記事に飛ばす */}
            <span className="tag">{category.name}</span>
            {subCategory.name && (
              <span className="tag">{subCategory.name}</span>
            )}
          </div>
          <div className="_icons">
            <div className="favorite-area">
              <FavoriteIcon className="favorite-button isClick" />
              <p className="favoriteNum">
                {summaryBook.favorite_count ? summaryBook.favorite_count : 0}
              </p>
            </div>
            {/* TODO: snsボタンを設置 */}
          </div>
        </div>
        <div className="_body">
          <ReadOnlyEditor editorState={summaryBook.content} />
          <FavoriteButton user_id={currentUser.uid} summary_id={url.id} />
        </div>
      </div>
    </>
  )
}

export default SummaryDetails

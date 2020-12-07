import React, { FC, useState, useEffect } from "react"
import clsx from "clsx"
import {
  ResSummaryBook,
  ResUser as CurrentUser,
  User,
  ResultResponse
} from "../../types"
import { getCurrentUser, getImage } from "../../firebase/functions"
import { Link } from "react-router-dom"
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  FavoriteIcon
} from "."
const user: CurrentUser = getCurrentUser()

type Props = {
  data: ResSummaryBook
  setting?: any
  columnNum?: string
  elType?: string
}

const MediaCard: FC<Props> = props => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const { data, setting, columnNum, elType } = props
  const {
    id,
    title,
    favorite_count,
    category,
    sub_category,
    user_name,
    discription,
    thumbnail,
    update_date
  } = data
  //const { isHiddenContent } = setting
  const [summaryThumbnail, setSummaryThumbnail] = useState<string>("")

  const formatTagColor = (_categoryName: string): string => {
    switch (_categoryName) {
      case "スポーツ":
        return "sport-tag"
      case "自然界":
        return "nature-tag"
      case "小説":
        return "novel-tag"
      case "ビジネス":
        return "business-tag"
      case "雑誌":
        return "magazin-tag"
      default:
        return "all-tag"
    }
  }

  const formatTag = () => {
    let now = new Date()
    let nowTime = Math.floor(now.getTime() / 1000)
    const diffTime = nowTime - update_date
    if (favorite_count > 0) {
      return <span className="main-tag recommned-tag">人気！</span>
    } else if (diffTime > 3600) {
      return <span className="main-tag new-tag">新着！</span>
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const resThumnail: ResultResponse<string> | void = await getImage(
          thumbnail
        )
        if (resThumnail && resThumnail.status === 200) {
          setSummaryThumbnail(resThumnail.data)
        }
      } catch (e) {}
    }

    loadData()
  }, [])

  return (
    <Link
      to={`/summary/${id}`}
      className={clsx(
        "summary-data-item",
        columnNum && columnNum,
        elType === "top-summary-list" ? "top-summary-list" : ""
      )}
    >
      <Card>
        <CardActionArea
          className={clsx(
            "article-ver",
            setting && setting.topSlider ? "top-ver" : ""
          )}
        >
          <CardMedia
            className={clsx(
              setting && setting.topSlider ? "sliderImg" : "media",
              elType === "top-summary-list" ? "top-summary-img" : ""
            )}
            image={summaryThumbnail}
            title="Contemplative Reptile"
          />
          <div
            className={clsx(
              "article-body",
              setting && setting.topSlider ? "top-article-body" : ""
            )}
          >
            <CardContent>
              <div className="categories">
                <span
                  className={clsx(
                    "main-tag",
                    category.name ? formatTagColor(category.name) : ""
                  )}
                >
                  {category && category.name}
                </span>
                {setting
                  ? !setting.isHiddenCategory
                  : true && (
                      <span className="main-tag sub-tag">
                        {sub_category && sub_category.name}
                      </span>
                    )}
                {formatTag()}
              </div>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className="_summary-ttl"
              >
                {title}
              </Typography>
              {setting
                ? !setting.isHiddenContent
                : true && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className="_summary-txt"
                    >
                      {discription}
                    </Typography>
                  )}
            </CardContent>
            <CardActions className="summary-bottom">
              <p className="user-name">@{user_name ? user_name : "名無し"}</p>
              <div className="favorite-area">
                <FavoriteIcon className="favorite-button isClick" />
                <p className="favoriteNum">
                  {favorite_count ? favorite_count : 0}
                </p>
              </div>
            </CardActions>
          </div>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default MediaCard

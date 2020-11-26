import React, { FC, useState, useEffect } from "react"
import clsx from "clsx"
import { ResSummaryBook, CurrentUser, User, ResultResponse } from "../../types"
import { getUser, getCurrentUser, getImage } from "../../firebase/functions"
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
import { settings } from "cluster"
const user: CurrentUser = getCurrentUser()

type Props = {
  data: ResSummaryBook
  setting?: any
}

const MediaCard: FC<Props> = props => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const { data, setting } = props
  const {
    id,
    title,
    favorite_count,
    category,
    user_name,
    discription,
    thumbnail
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

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      const resThumnail: ResultResponse<string> | void = await getImage(
        thumbnail
      )
      if (!unmounted) {
        if (resThumnail && resThumnail.status === 200) {
          setSummaryThumbnail(resThumnail.data)
        }
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <Link to={`/summary/${id}`} className="summary-data-item">
      <Card>
        <CardActionArea
          className={clsx(
            "article-ver",
            setting && setting.topSlider ? "top-ver" : ""
          )}
        >
          <CardMedia
            className={setting && setting.topSlider ? "sliderImg" : "media"}
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

import React, { FC, useState, useEffect } from "react"
import clsx from "clsx"
import {
  ResSummaryBook,
  CurrentUser,
  User,
  Category,
  ResultResponse,
  ResCategory
} from "../../types"
import { FavoriteButton } from "../../components"
import { getUser, getCategory, getCurrentUser } from "../../firebase/functions"
import articleImg from "../../static/images/izumi-img.jpg"
import { Link } from "react-router-dom"
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  makeStyles,
  Button,
  FavoriteIcon
} from "."
const user: CurrentUser = getCurrentUser()

const useStyles = makeStyles({
  media: {
    height: 140
  }
})

type Props = {
  data: ResSummaryBook
}

const MediaCard: FC<Props> = props => {
  const [myCategory, setMyCategory] = useState<Category>({})
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const classes = useStyles()
  const { id, title, favorite_count, category, user_id, content } = props.data
  const [User, setUser] = useState<User>({})

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
    console.log(category)
    ;(async () => {
      let resUser = await getUser(user_id)
      let user: User = {}
      if (resUser && resUser.status === 200) {
        const { displayName, photoURL, email, password } = resUser.data
        user = { displayName, photoURL, email, password }
      }
      const resCategory: void | any = await getCategory(category)
      if (!unmounted) {
        setUser(user)
        if (resCategory && resCategory.status === 200) {
          setMyCategory(resCategory)
        }
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <Link to={`/summary/${id}`} className="data-item">
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={articleImg}
            title="Contemplative Reptile"
          />
          <CardContent>
            <div className="categories">
              <span
                className={clsx(
                  "main-tag",
                  myCategory.name ? formatTagColor(myCategory.name) : ""
                )}
              >
                {myCategory && myCategory.name}
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
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="_summary-txt"
            >
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div className="favorite-area">
            <FavoriteIcon className="favorite-button" />
            <p className="favoriteNum">{favorite_count}</p>
          </div>
        </CardActions>
        <CardActions className="summary-bottom">
          <p className="user-name">
            @{User.displayName ? User.displayName : "名無し"}
          </p>
          <FavoriteButton user_id={currentUser.uid} summary_id={id} />
        </CardActions>
      </Card>
    </Link>
  )
}

export default MediaCard

import React, { useState, useEffect, FC } from "react"
import { Link } from "react-router-dom"
import {
  ResUser as CurrentUser,
  ResSummaryBook,
  ResultResponse
} from "../../../types"
import clsx from "clsx"
import { getCurrentUser, getImage } from "../../../firebase/functions"
import { formatUpdateDate } from "../../../utils/function"
const user: CurrentUser = getCurrentUser()

type Props = {
  data: ResSummaryBook
  time?: number
}

const MypageSummaries: FC<Props> = props => {
  const [summaryThumbnail, setSummaryThumbnail] = useState<string>("")
  const { data, time } = props
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [loading, setLoading] = useState<boolean>(false)

  const formatPublishingStatus = (_status: string) => {
    switch (_status) {
      case "public":
        return "公開中"
      case "private":
        return "非公開"
      default:
        return "非公開"
    }
  }

  const formatPublishingStatusClassName = (_status: string) => {
    switch (_status) {
      case "public":
        return "green"
      case "private":
        return "red"
      default:
        return "red"
    }
  }

  const isShowElementOnlyCurrentUser = (): boolean => {
    return data.user_id === currentUser.id
  }

  useEffect(() => {
    const loadData = async () => {
      if (Object.keys(data).length < 0) return
      try {
        const resThumnail: ResultResponse<string> | void = await getImage(
          data.thumbnail
        )
        if (resThumnail && resThumnail.status === 200) {
          setSummaryThumbnail(resThumnail.data)
        }
      } catch (e) {}
    }

    loadData()
    setLoading(true)
  }, [])

  return (
    <>
      {time && (
        <div className="_update-date">
          あなたが{formatUpdateDate(time)}
          に閲覧しました。
        </div>
      )}
      <Link to={`/summary/${data.id}`} className="summaries-stack">
        <div className="left-box">
          {loading && summaryThumbnail && (
            <img src={summaryThumbnail} alt={data.title} />
          )}
        </div>
        <div className="right-box">
          {isShowElementOnlyCurrentUser() && (
            <span
              className={clsx(
                "label",
                `${formatPublishingStatusClassName(data.publishing_status)}`
              )}
            >
              {formatPublishingStatus(data.publishing_status)}
            </span>
          )}
          <h3 className="_title">{data.title}</h3>
          {isShowElementOnlyCurrentUser() && (
            <div className="_summary-edit-btn">
              <Link
                to={`/summary/${data.id}/edit`}
                className="_btn _edit _wd-6-btn"
              >
                編集する
              </Link>
            </div>
          )}
          <dl className="_date">
            <dt>投稿日時</dt>
            <dd>
              <p className="_description">
                {formatUpdateDate(data.update_date)}
              </p>
            </dd>
          </dl>
        </div>
      </Link>
    </>
  )
}

export default MypageSummaries

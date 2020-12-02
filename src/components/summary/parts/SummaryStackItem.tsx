import React, { useState, useEffect, FC } from "react"
import { Link } from "react-router-dom"
import { ResSummaryBook, ResultResponse } from "../../../types"
import clsx from "clsx"
import { getImage } from "../../../firebase/functions"
import { formatUpdateDate } from "../../../utils/function"

type Props = {
  data: ResSummaryBook
  time?: number
}

const MypageSummaries: FC<Props> = props => {
  const [summaryThumbnail, setSummaryThumbnail] = useState<string>("")
  const { data, time } = props
  const [loading, setLoading] = useState<boolean>(false)

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
      <div className="summaries-stack">
        <div className="left-box">
          {loading && summaryThumbnail && (
            <img src={summaryThumbnail} alt={data.title} />
          )}
        </div>
        <div className="right-box">
          <h3 className="_title">{data.title}</h3>
          <dl className="_date">
            <dt>投稿日時</dt>
            <dd>
              <p className="_description">
                {formatUpdateDate(data.update_date)}
              </p>
            </dd>
          </dl>
        </div>
      </div>
    </>
  )
}

export default MypageSummaries

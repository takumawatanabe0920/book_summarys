import React, { FC, useState, useEffect } from "react"
import { getRankingSummaries } from "../../firebase/functions"
import Slider from "react-slick"
import { SummaryItem } from "../../components"
import { ResultResponseList, ResSummaryBook } from "../../types"

const TopSummaryList = () => {
  const [rankingThisMonthSummaries, setRankingThisMonthSummaries] = useState<
    ResSummaryBook[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)

  let settings
  if (window.innerWidth < 768) {
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    }
  } else if (window.innerWidth < 1040) {
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 2,
      slidesToScroll: 2
    }
  } else {
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 3
    }
  }

  const settingsTopSlider = {
    isHiddenContent: true,
    isHiddenCategory: true,
    topSlider: true
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("called")
        let resSummariesRankingDataList: ResultResponseList<ResSummaryBook> = await getRankingSummaries(
          6,
          "public",
          "month"
        )
        if (
          resSummariesRankingDataList &&
          resSummariesRankingDataList.status === 200
        ) {
          setRankingThisMonthSummaries(resSummariesRankingDataList.data)
        }
      } catch (e) {}
    }
    loadData()
    setLoading(true)
  }, [])

  return (
    <>
      {loading && (
        <Slider {...settings}>
          {rankingThisMonthSummaries.map((data: ResSummaryBook) => {
            return (
              <SummaryItem
                key={data.id}
                data={data}
                setting={settingsTopSlider}
                elType="top-summary-list"
              />
            )
          })}
        </Slider>
      )}
    </>
  )
}

export default TopSummaryList

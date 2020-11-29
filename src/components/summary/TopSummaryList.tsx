import React, { FC, useState, useEffect, useMemo } from "react"
import { getSummaries, getRankingSummaries } from "../../firebase/functions"
import Slider from "react-slick"
import { SummaryItem } from "../../components"
import { ResultResponseList, ResSummaryBook } from "../../types"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const TopSummaryList = () => {
  const [allRankingSummaries, setAllRankingSummaries] = useState<
    ResSummaryBook[]
  >([])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1
  }

  const settingsTopSlider = {
    isHiddenContent: true,
    isHiddenCategory: true,
    topSlider: true
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let resSummariesRankingDataList: ResultResponseList<ResSummaryBook> = await getRankingSummaries(
        6
      )
      if (!unmounted) {
        if (
          resSummariesRankingDataList &&
          resSummariesRankingDataList.status === 200
        ) {
          setAllRankingSummaries(resSummariesRankingDataList.data)
        }
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <Slider {...settings}>
        {allRankingSummaries.map((data: ResSummaryBook) => {
          return (
            <SummaryItem
              key={data.id}
              data={data}
              setting={settingsTopSlider}
            />
          )
        })}
      </Slider>
    </>
  )
}

export default TopSummaryList

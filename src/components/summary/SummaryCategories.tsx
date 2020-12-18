import React, { useState, useEffect, FC } from "react"
// components
import { ResultResponseList, ResCategory } from "../../types"
import { getCategoriesPopulateImage, readQuery } from "../../firebase/functions"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { url } from "inspector"

type Props = {
  fetchData: any
}

const SummaryCategories: FC<Props> = props => {
  const [categories, setCategories] = useState<ResCategory[]>([])
  const { fetchData } = props

  const updateData = (slug: string, name: string): void => {
    fetchData(slug, name)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const resCategoryList: ResultResponseList<ResCategory> = await getCategoriesPopulateImage()
        console.log(resCategoryList)
        if (resCategoryList && resCategoryList.status === 200) {
          setCategories(resCategoryList.data)
        }
      } catch (e) {}
    }

    loadData()
  }, [])

  return (
    <>
      <div className="summary-category">
        <h2 className="_ttl">カテゴリーで選ぶ</h2>
        <div className="_category-body">
          {categories.map((data: ResCategory) => {
            return (
              <Link
                style={{
                  background: `url(${data.image}) no-repeat center center`,
                  backgroundSize: "cover"
                }}
                onClick={() => updateData(data.id, data.name)}
                to={`/summary?category=${data.id}`}
                className="_data"
              >
                <p className="_data-tag">{data.name}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default SummaryCategories

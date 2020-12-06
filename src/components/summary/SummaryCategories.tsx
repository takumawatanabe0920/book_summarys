import React, { useState, useEffect, FC } from "react"
// components
import { ResultResponseList, ResCategory } from "../../types"
import { getCategories, readQuery } from "../../firebase/functions"
import { Link } from "react-router-dom"
import clsx from "clsx"

type Props = {
  fetchData: any
}

const SummaryCategories: FC<Props> = props => {
  const [categories, setCategories] = useState<ResCategory[]>([])
  const { fetchData } = props

  const updateData = (slug: string, name: string): void => {
    fetchData(slug, name)
  }

  const formatCategoryImage = (_type: string): string => {
    switch (_type) {
      case "sports":
        return "sportImage"
      case "business":
        return "businessImage"
      case "novel":
        return "novelImage"
      case "magazin":
        return "magazinImage"
      case "nature":
        return "natureImage"
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const resCategoryList: ResultResponseList<ResCategory> = await getCategories()
        setCategories(resCategoryList.data)
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
                onClick={() => updateData(data.id, data.name)}
                to={`/summary?category=${data.id}`}
                className={clsx("_data", formatCategoryImage(data.slug))}
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

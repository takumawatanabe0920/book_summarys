import React, { useState, useEffect, FC } from "react"
// components
import { ResCategory } from "../../types"
import { Link } from "react-router-dom"

type Props = {
  data: ResCategory
  fetchData?: any
}

const CategoryItem: FC<Props> = props => {
  const [categories, setCategories] = useState<ResCategory[]>([])
  console.log(props.data)
  const { data, fetchData } = props
  const { id, name, slug } = data

  const updataLink = () => {}

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!unmounted) {
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])
  return (
    <>
      <Link to={`/summary?category=${slug}`}>{name}</Link>
    </>
  )
}

export default CategoryItem

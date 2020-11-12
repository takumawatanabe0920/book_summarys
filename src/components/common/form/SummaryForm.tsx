import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import useReactRouter from "use-react-router"
import Input from "./parts/Input"
import Textarea from "./parts/Textarea"
import Select from "./parts/Select"

import {
  SummaryBook,
  ResCategory,
  ResSubCategory
} from "../../../types/summary"
import { CurrentUser } from "../../../types/user"
import functions from "../../../utils/functions"
const {
  getCategories,
  categoryLinkingSubCategory,
  createSummary,
  getCurrentUser
} = functions
const user: CurrentUser = getCurrentUser()

const SummaryForm = () => {
  const [values, setValues] = useState<SummaryBook>({})
  const [categories, setCategories] = useState<ResCategory[]>([])
  const [subCategories, setSubCategories] = useState<ResSubCategory[]>([])
  const [isSelectCategory, setIsSelectCategory] = useState<boolean>(false)
  const { register, handleSubmit, errors, formState } = useForm<SummaryBook>({
    mode: "onChange"
  })

  const { history } = useReactRouter()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setValues({ ...values, [name]: value })
  }

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.persist()
    const target = event.target
    const value = target.value
    const name = target.name
    setValues({ ...values, [name]: value })
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.persist()
    const target = event.target
    const value = target.value
    const name = target.name
    setValues({ ...values, [name]: value })
    setIsSelectCategory(true)
    subCategorySelect(value)
  }

  const onSubmit = async (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    values.favorite_id = []

    if (window.confirm("記事を作成しますか？")) {
      const resSummary: { id?: string; status: number } = await createSummary(
        values
      )
      if (resSummary && resSummary.status === 200) {
        history.push(`/summary/${resSummary.id}`)
      } else {
        console.log("失敗しました。")
        history.push("/")
      }
    }
  }

  const subCategorySelect = async (categoryId?: string) => {
    const subCate = await categoryLinkingSubCategory(categoryId)
    setSubCategories(subCate)
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let cate_result = await getCategories()

      if (!unmounted) {
        console.log("called-first")
        setCategories(cate_result)
        setValues({ ...values, ["user_id"]: user.uid })
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <form className="form-table">
        <Input
          title="本のタイトル"
          name="title"
          placeholder="人を動かす"
          required={true}
          onChange={handleInputChange}
        />
        {errors.title && "作者名は1文字以上、20文字以下でなければなりません。"}
        <Textarea
          title="本の内容"
          name="content"
          required={true}
          onChange={handleTextareaChange}
        />
        <Select
          title="本のカテゴリー"
          name="category"
          required={true}
          dataList={categories}
          onChange={handleSelectChange}
        />
        {isSelectCategory && (
          <Select
            title="本のサブカテゴリー"
            name="sub_category"
            onChange={handleSelectChange}
            dataList={subCategories}
          />
        )}
        <Input
          title="筆者"
          name="author"
          placeholder="要約太郎"
          onChange={handleInputChange}
        />
        <Input
          title="値段"
          name="price"
          placeholder="4000円"
          onChange={handleInputChange}
        />
        <Input
          title="評価(5段階)"
          name="review"
          placeholder="星４"
          onChange={handleInputChange}
        />
        <Input
          title="商品リンク"
          name="product_links"
          placeholder="https://~"
          onChange={handleInputChange}
        />

        <div className="btn-area mgt-2 inline">
          <button className="_btn submit" type="submit" onClick={onSubmit}>
            作成する
          </button>
          {/* <button className="_btn submit" type="submit">
            編集する
          </button> */}
          <button className="_btn remove" type="button">
            削除する
          </button>
        </div>
      </form>
    </>
  )
}

export default SummaryForm

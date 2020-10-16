import React, { useState, useEffect } from "react"
import Input from "./parts/Input"
import Textarea from "./parts/Textarea"
import Select from "./parts/Select"

type SummaryBook = {
  title: number
  content: string
  category: string
  sub_category: string
  author: string
  price: string
  review: string
  product_links: string
}

const SummaryForm = () => {
  const [values, setValues] = useState<SummaryBook[]>([])

  // function handleInputChange(e) {
  //   const target = e.target
  //   const value = target.type === "checkbox" ? target.checked : target.value
  //   const name = target.name
  //   setValues({ ...values, [name]: value })
  // }

  return (
    <>
      <form className="form-table">
        <Input
          title="本のタイトル"
          name="title"
          placeholder="人を動かす"
          required={true}
        />
        <Textarea title="本の内容" name="content" required={true} />
        <Select title="本のカテゴリー" name="category" required={true} />
        <Select title="本のサブカテゴリー" name="sub_category" />
        <Input title="筆者" name="author" placeholder="要約太郎" />
        <Input title="値段" name="price" placeholder="4000円" />
        <Input title="評価(5段階)" name="review" placeholder="星４" />
        <Input
          title="商品リンク"
          name="product_links"
          placeholder="https://~"
        />

        <div className="btn-area mgt-2 inline">
          <button className="_btn submit" type="submit">
            作成して記事を編集
          </button>
          <button className="_btn submit" type="submit">
            編集する
          </button>
          <button className="_btn remove" type="button">
            削除する
          </button>
        </div>
      </form>
    </>
  )
}

export default SummaryForm

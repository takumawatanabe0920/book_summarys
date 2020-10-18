import React, { useState, useEffect, useMemo } from "react"
import Input from "./parts/Input"
import Textarea from "./parts/Textarea"
import Select from "./parts/Select"
import firebase from "../../../firebase/config.jsx"
const db = firebase.firestore()
//firebase.auth().signInWithEmailAndPassword("takuma.w@tential.jp", "Takuma0920")

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

type Categories = {
  name?: string
  slug?: string
}

type SubCategories = {
  category_id?: string
  name?: string
  slug?: string
}

const SummaryForm = () => {
  const [values, setValues] = useState<SummaryBook[]>([])
  const [categories, setCategories] = useState<Categories[]>([])
  const [subCategories, setSubCategories] = useState<SubCategories[]>([])

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
  }

  const onSubmit = (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    const error = values.length === 0
    // if (error) {
    //   return alert("未入力項目があります")
    // }
    if (window.confirm("記事を作成しますか？")) {
      db.collection("summary")
        .add({
          values
        })
        .then(res => {
          console.log("Document written with ID: ", res)
        })
        .catch(error => {
          console.error("Error adding document: ", error)
        })
    }
  }

  const getCategories = () => {
    const snapShot = db
      .collection("category")
      .get()
      .then(res => res.docs.map(doc => doc.data()))

    return snapShot
  }

  const getSubCategories = () => {
    const snapShot = db
      .collection("sub_category")
      .get()
      .then(res => res.docs.map(doc => doc.data()))

    return snapShot
  }

  //setSubCategories
  //let subCategories = useMemo(getSubCategories, [])

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      let cate_result = await getCategories()
      let sub_cate_result = await getSubCategories()
      if (!unmounted) {
        setCategories(cate_result)
        setSubCategories(sub_cate_result)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  useEffect(() => {
    console.log(values)
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
        <Select
          title="本のサブカテゴリー"
          name="sub_category"
          onChange={handleSelectChange}
          dataList={subCategories}
        />
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
            送信
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

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import useReactRouter from "use-react-router"
import { Input, Textarea, Select, Alert } from "../../../components"
import {
  SummaryBook,
  ResCategory,
  ResSubCategory,
  CurrentUser,
  ResultResponse,
  ResultResponseList,
  ResFavorite
} from "../../../types"
import {
  getCategories,
  categoryLinkingSubCategory,
  createSummary,
  getCurrentUser,
  uploadImage
} from "../../../firebase/functions"
import useAlertState from "../../../assets/hooks/useAlertState"
import { RichEditor, ReadOnlyEditor } from "./../../../utils/richtext"
const user: CurrentUser = getCurrentUser()

const SummaryForm = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [values, setValues] = useState<SummaryBook>({})
  const [categories, setCategories] = useState<ResCategory[]>([])
  const [publishingSettings, setPublishingSettings] = useState([
    { id: "public", name: "公開" },
    { id: "private", name: "非公開" }
  ])
  const [subCategories, setSubCategories] = useState<ResSubCategory[]>([])
  const [isSelectCategory, setIsSelectCategory] = useState<boolean>(false)
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState<string | void>("")
  const { register, handleSubmit, errors, formState } = useForm<SummaryBook>({
    mode: "onChange"
  })
  const [
    isShowAlert,
    alertStatus,
    alertText,
    throwAlert,
    closeAlert
  ] = useAlertState(false)

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
    console.log({ ...values, [name]: value })
    setValues({ ...values, [name]: value })
  }

  const handleSelectCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.persist()
    const value = event.target.value
    setValues({ ...values, category: value })
    setIsSelectCategory(true)
    subCategorySelect(value)
  }

  const handleEditorChange = (value: any) => {
    setValues({ ...values, content: value })
  }

  const subCategorySelect = async (categoryId?: string) => {
    const resSubCategoryList: ResultResponseList<ResFavorite> = await categoryLinkingSubCategory(
      categoryId
    )
    if (resSubCategoryList && resSubCategoryList.status === 200) {
      setSubCategories(resSubCategoryList.data)
    } else {
      await throwAlert("danger", "エラーが発生しました。")
    }
  }

  const handleChangeThumbnail = (_fileImg: File): string | void => {
    //const fileBase64 = getBase64(file)
    if (validateImageUploads(_fileImg)) return
    if (_fileImg.type.startsWith("image/")) {
      const imgUrl = window.URL.createObjectURL(_fileImg)
      return imgUrl
    }
  }

  const validateImageUploads = (_file: File): string | void => {
    if (!_file) return
    if (_file.size > 1000000) {
      throwAlert("danger", "ファイルサイズが1MBを超えています")
      return "err"
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const target = event.target
    const imgFile = target.files[0]
    const resImgUrl = handleChangeThumbnail(imgFile)
    setImageUrl(resImgUrl)
    setImage(imgFile)
  }

  const onTogglePreview = (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    setIsPreview(!isPreview)
  }

  const onSubmit = async (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    values.favorite_id = []

    if (window.confirm("記事を作成しますか？")) {
      const resUpload: ResultResponse<any> = await uploadImage(image, "summary")
      if (resUpload.status === 200) {
        values.thumbnail = resUpload.data
      } else {
        return await throwAlert("danger", "画像のアップロードに失敗しました。")
      }
      console.log(values)
      const resSummary: ResultResponse<SummaryBook> = await createSummary(
        values
      )
      if (resSummary && resSummary.status === 200) {
        await throwAlert("success", "記事が作成されました。")
        setValues({})
        //history.push(`/summary/${resSummary.id}`)
      } else {
        history.push("/")
      }
    }
  }

  const editForm = () => {
    return (
      <>
        <Input
          title="本のタイトル"
          name="title"
          placeholder="人を動かす"
          required={true}
          onChange={handleInputChange}
        />
        <Input
          title="サムネイル"
          name="thumbnail"
          required={true}
          type="file"
          onChange={handleImageChange}
        />
        {imageUrl && <img src={imageUrl} alt="" />}
        <Textarea
          title="リード分"
          name="discription"
          placeholder="一覧表示時に表示される文章になります。"
          required={true}
          onChange={handleTextareaChange}
        />
        {errors.title && "作者名は1文字以上、20文字以下でなければなりません。"}
        <RichEditor title="本の内容" handleEditorChange={handleEditorChange} />
        <Select
          title="本のカテゴリー"
          name="category"
          required={true}
          dataList={categories}
          onChange={handleSelectCategoryChange}
        />
        {isSelectCategory ? "true" : "false"}
        {isSelectCategory && (
          <Select
            title="本のサブカテゴリー"
            name="sub_category"
            onChange={handleSelectChange}
            dataList={subCategories}
          />
        )}
        {/* <Input
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
        /> */}
        <Select
          title="公開設定"
          name="publishing_status"
          required={true}
          dataList={publishingSettings}
          onChange={handleSelectChange}
        />
        {/* <Input
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
        /> */}
      </>
    )
  }

  const preview = () => {
    return (
      <>{values.content && <ReadOnlyEditor editorState={values.content} />}</>
    )
  }

  useEffect(() => {
    let unmounted = false
    closeAlert()
    ;(async () => {
      const resCategoryList: ResultResponseList<ResFavorite> = await getCategories()
      if (!unmounted) {
        if (resCategoryList && resCategoryList.status === 200) {
          setCategories(resCategoryList.data)
        }
        setValues({
          ...values,
          ["user_id"]: currentUser.uid,
          ["user_name"]: currentUser.displayName
            ? currentUser.displayName
            : currentUser.email
        })
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <Alert
        is_show_alert={isShowAlert}
        alert_status={alertStatus}
        alert_text={alertText}
      />
      {isPreview && preview()}
      <form className="form-table">
        {!isPreview && editForm()}
        <div className="btn-area mgt-2 inline">
          <button className="_btn submit" type="submit" onClick={onSubmit}>
            作成する
          </button>
          {/* <button className="_btn submit" type="submit">
            編集する
          </button> */}
          <button
            className="_btn preview"
            type="button"
            onClick={onTogglePreview}
          >
            {isPreview ? "編集する" : "プレビュー"}
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

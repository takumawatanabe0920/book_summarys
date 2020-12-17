import React, { useState, useEffect, FC, useContext } from "react"
import { useForm } from "react-hook-form"
import useReactRouter from "use-react-router"
import { Input, Textarea, Select } from "../../../components"
import {
  SummaryBook,
  ResCategory,
  ResSubCategory,
  ResultResponse,
  ResultResponseList,
  ResFavorite,
  ResSummaryBook
} from "../../../types"
import {
  getCategories,
  categoryLinkingSubCategory,
  createSummary,
  updateSummary,
  uploadImage,
  responseUploadImage
} from "../../../firebase/functions"
import useAlertState from "../../../assets/hooks/useAlertState"
import { RichEditor, ReadOnlyEditor } from "./../../../utils/richtext"
import { GlobalContext } from "../../../assets/hooks/context/Global"

type Props = {
  isEdit?: boolean
  editData?: ResSummaryBook
}

const SummaryForm: FC<Props> = props => {
  const { isEdit, editData } = props
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
  const [errorTexts, setErrorTexts] = useState<SummaryBook>({})
  const [thumnail, setThumnail] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
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
  const { currentUser, setCurrentUser } = useContext(GlobalContext)

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
    if (validateImageUploads(_fileImg)) return
    if (_fileImg.type.startsWith("image/")) {
      const imgUrl = window.URL.createObjectURL(_fileImg)
      return imgUrl
    }
  }

  const validateImageUploads = (_file: File): string | void => {
    if (!_file) return
    if (_file.size > 1000000) {
      setImageUrl(null)
      setImage(undefined)
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

  const validationCheck = async (): Promise<boolean> => {
    let isError: boolean = false
    let errorText: SummaryBook = {}
    const {
      title,
      content,
      category,
      thumbnail,
      discription,
      book_name,
      publishing_status
    } = values
    if (!title || !title.match(/\S/g)) {
      isError = true
      errorText.title = "記事のタイトルを入力してください。"
    }

    if (!book_name || !book_name.match(/\S/g)) {
      isError = true
      errorText.book_name = "本のタイトルを入力してください。"
    }

    if (!discription || !discription.match(/\S/g)) {
      isError = true
      errorText.discription = "リード文を入力してください。"
    } else if (discription.length < 20) {
      errorText.discription = "20文字以上で入力してください。"
    }
    if (!content || !content.match(/\S/g)) {
      isError = true
      errorText.content = "本の内容を入力してください。"
    } else if (content) {
      let count = 0
      const blocks = JSON.parse(content).blocks
      blocks.forEach((block: any) => {
        if (!block.text) return
        count += block.text.length
      })
      if (count < 50) {
        errorText.content = "50文字以上で入力してください。"
      }
    }
    if (!thumbnail && (!image || !imageUrl)) {
      isError = true
      errorText.thumbnail = "サムネイル画像を設定してください。"
    }
    if (!category || !category.match(/\S/g)) {
      isError = true
      errorText.category = "本のカテゴリーを設定してください。"
    }
    if (!publishing_status || !category.match(/\S/g)) {
      isError = true
      errorText.publishing_status = "この記事の公開設定をしてください。"
    }
    setErrorTexts(errorText)

    if (isError) {
      await throwAlert("danger", "入力に不備があります。")
      return isError
    } else {
      isError = false
      return isError
    }
  }

  const onSubmit = async (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    values.favorite_id = []
    if (await validationCheck()) return
    if (
      window.confirm(isEdit ? "修正分を反映しますか？" : "記事を作成しますか？")
    ) {
      if (imageUrl) {
        const resUpload: ResultResponse<any> = await uploadImage(
          image,
          "summary"
        )
        if (resUpload.status === 200) {
          values.thumbnail = resUpload.data
        } else {
          return await throwAlert(
            "danger",
            "画像のアップロードに失敗しました。"
          )
        }
      }
      let resSummary: ResultResponse<ResSummaryBook>
      if (isEdit) {
        resSummary = await updateSummary(values)
      } else {
        resSummary = await createSummary(values)
      }
      if (resSummary && resSummary.status === 200) {
        await throwAlert(
          "success",
          isEdit ? "記事が編集されました。" : "記事が作成されました。"
        )
        setValues({})
        history.push(`/summary/${resSummary.data.id}`)
      } else {
        history.push("/")
      }
    }
  }

  const editForm = () => {
    return (
      <>
        <h2 className="main-title blue-main-title blue-back">記事編集画面</h2>
        <Input
          title="記事のタイトル"
          name="title"
          value={values && values.title ? values.title : ""}
          placeholder="仲間を増やすコツ"
          required={true}
          onChange={handleInputChange}
          errorMessage={errorTexts.title ? errorTexts.title : ""}
        />
        <Input
          title="本のタイトル"
          name="book_name"
          value={values && values.book_name ? values.book_name : ""}
          placeholder="人を動かす"
          required={true}
          onChange={handleInputChange}
          errorMessage={errorTexts.book_name ? errorTexts.book_name : ""}
        />
        <Input
          title="サムネイル"
          name="thumbnail"
          required={true}
          type="file"
          onChange={handleImageChange}
          errorMessage={errorTexts.thumbnail ? errorTexts.thumbnail : ""}
        />
        <div className="_thumnail-area">
          {thumnail && (
            <dl>
              <dt>登録サムネイル</dt>
              <dd>
                <img src={thumnail} alt="登録サムネイル画像" />
              </dd>
            </dl>
          )}
          {imageUrl && (
            <dl>
              <dt>{isEdit ? "変更後サムネイル" : "登録サムネイル"}</dt>
              <dd>
                <img src={imageUrl} alt="表示画像" />
              </dd>
            </dl>
          )}
        </div>
        <Textarea
          title="リード文"
          name="discription"
          value={values && values.discription ? values.discription : ""}
          placeholder="一覧表示時に表示される文章になります。"
          required={true}
          onChange={handleTextareaChange}
          errorMessage={errorTexts.discription ? errorTexts.discription : ""}
        />
        {errors.title && "作者名は1文字以上、20文字以下でなければなりません。"}
        <RichEditor
          title="本の内容"
          required={true}
          handleEditorChange={handleEditorChange}
          value={values && values.content ? values.content : ""}
          errorMessage={errorTexts.content ? errorTexts.content : ""}
        />
        <Select
          title="本のカテゴリー"
          name="category"
          required={true}
          dataList={categories}
          onChange={handleSelectCategoryChange}
          value={values && values.category ? values.category : ""}
          errorMessage={errorTexts.category ? errorTexts.category : ""}
        />
        {isSelectCategory && (
          <Select
            title="本のサブカテゴリー"
            name="sub_category"
            value={values && values.sub_category ? values.sub_category : ""}
            onChange={handleSelectChange}
            dataList={subCategories}
          />
        )}
        <Select
          title="公開設定"
          name="publishing_status"
          value={
            values && values.publishing_status ? values.publishing_status : ""
          }
          required={true}
          dataList={publishingSettings}
          onChange={handleSelectChange}
          errorMessage={
            errorTexts.publishing_status ? errorTexts.publishing_status : ""
          }
        />
      </>
    )
  }

  const preview = () => {
    return (
      <>
        <h2 className="main-title blue-main-title blue-back">プレビュー画面</h2>
        {values.content && <ReadOnlyEditor editorState={values.content} />}
      </>
    )
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const resCategoryList: ResultResponseList<ResCategory> = await getCategories()
        if (resCategoryList && resCategoryList.status === 200) {
          setCategories(resCategoryList.data)
        }
        if (isEdit && Object.keys(editData).length > 0) {
          const resThumnail: string = await responseUploadImage(
            editData.thumbnail
          )
          subCategorySelect(editData.category)
          setIsSelectCategory(true)
          setThumnail(resThumnail)
          setValues({
            ...editData,
            ["user_id"]: currentUser && currentUser.id,
            ["user_name"]: currentUser.displayName
              ? currentUser.displayName
              : ""
          })
        } else {
          setValues({
            ...values,
            ["user_id"]: currentUser && currentUser.id,
            ["user_name"]: currentUser.displayName
              ? currentUser.displayName
              : ""
          })
        }
        setLoading(true)
      } catch (e) {}
    }

    loadData()
  }, [image])

  return (
    <>
      {loading && (
        <>
          {isPreview && preview()}
          <form className="form-table">
            {!isPreview && editForm()}
            <div className="_btns">
              {!isPreview && (
                <>
                  <button
                    className="_btn _sm-btn"
                    type="submit"
                    onClick={onSubmit}
                  >
                    {isEdit ? "編集する" : "作成する"}
                  </button>
                  {/* <button className="_btn _sm-btn _sub-btn" type="button">
                    保存する(下書き)
                  </button> */}
                </>
              )}
              <button
                className="_btn _sm-btn _sub-btn"
                type="button"
                onClick={onTogglePreview}
              >
                {isPreview ? "編集する" : "プレビュー"}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  )
}

export default SummaryForm

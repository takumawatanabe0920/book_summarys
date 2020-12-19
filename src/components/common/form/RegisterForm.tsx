import React, { useState, useEffect, FC, useContext } from "react"
import useReactRouter from "use-react-router"
import { Link } from "react-router-dom"
import { Input, Trimming } from "../../../components"
import {
  RegisterUser,
  ResultResponse,
  ResUser as CurrentUser
} from "../../../types"
import { stateFile } from "../../../components/common/form/Trimming"
import useAlertState from "../../../assets/hooks/useAlertState"
import {
  register,
  updateUser,
  uploadImage,
  responseUploadImage,
  getCurrentUser
} from "../../../firebase/functions"
import { GlobalContext } from "../../../assets/hooks/context/Global"

type Props = {
  isEdit?: boolean
  userData?: CurrentUser
}

const RegisterForm: FC<Props> = props => {
  const { isEdit, userData } = props
  const [values, setValues] = useState<RegisterUser>({})
  const [errorTexts, setErrorTexts] = useState<RegisterUser>({})
  const [userIcon, setUserIcon] = useState<string>("")
  const [state, setState] = useState<stateFile>({
    src: null,
    crop: {
      unit: "%",
      width: 50,
      height: 50,
      aspect: 1
    }
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

  const formatButton = () => {
    if (isEdit) {
      return (
        <button className="_btn submit" type="submit" onClick={onSubmit}>
          更新する
        </button>
      )
    } else {
      return (
        <div className="_btns">
          <button className="_btn submit" type="submit" onClick={onSubmit}>
            登録する
          </button>
          <Link to="/sign_in" className="_btn _sub-btn">
            ログインページへ
          </Link>
        </div>
      )
    }
  }

  const validationCheck = async (): Promise<boolean> => {
    let isError: boolean = false
    let errorText: RegisterUser = {}
    const { displayName, email, password } = values
    if (!displayName || !displayName.match(/\S/g)) {
      isError = true
      errorText.displayName = "名前を入力してください。"
    }
    if (!isEdit) {
      if (!email || !email.match(/\S/g)) {
        isError = true
        errorText.email = "メールアドレスを入力してください。"
      } else if (
        !email.match(
          /^[\w!#$%&'*+/=?^_` + "`" + `{|}~-]+(?:\.[\w!#$%&'*+/=?^_` + "`" + `{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[a-zA-Z0-9](?:[\w-]*[\w])?$/
        )
      ) {
        isError = true
        errorText.email = "形式が正しくありません。"
      }

      if (!password || !password.match(/\S/g)) {
        isError = true
        errorText.password = "パスワードを入力してください。"
      } else if (password.length < 6) {
        errorText.password = "6文字以上で入力してください。"
      } else if (!password.match(/^[0-9a-zA-Z]*$/)) {
        errorText.password = "半角英数字で入力してください。"
      }
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
    const { displayName, email, password } = values
    if (await validationCheck()) return
    if (
      window.confirm(isEdit ? "会員情報を編集しますか？" : "会員登録しますか？")
    ) {
      if (state && state.blobFile) {
        const resUpload: ResultResponse<any> = await uploadImage(
          state.blobFile,
          "user"
        )
        if (resUpload.status === 200) {
          values.photoURL = resUpload.data
        } else {
          return await throwAlert(
            "danger",
            "画像のアップロードに失敗しました。"
          )
        }
      }
      let resCreateOrUpdate: ResultResponse<RegisterUser>
      if (isEdit) {
        resCreateOrUpdate = await updateUser(
          userData.id,
          userData.login_id,
          displayName,
          values.photoURL
        )
      } else {
        resCreateOrUpdate = await register(
          email,
          password,
          displayName,
          values.photoURL
        )
      }
      if (isEdit) {
        if (resCreateOrUpdate && resCreateOrUpdate.status === 200) {
          const user: CurrentUser = getCurrentUser()
          setCurrentUser(user)
          await throwAlert("success", "会員情報を更新しました。")
          history.replace(`/`)
        } else if (resCreateOrUpdate.status === 400) {
          await throwAlert("danger", "会員情報の更新に失敗しました。")
        }
      } else {
        if (resCreateOrUpdate && resCreateOrUpdate.status === 200) {
          const user: CurrentUser = getCurrentUser()
          setCurrentUser(user)
          await throwAlert("success", "会員情報に成功しました。")
          history.replace(`/`)
        } else if (
          resCreateOrUpdate.status === 400 &&
          resCreateOrUpdate.error === "user is exist"
        ) {
          await throwAlert("danger", "メールアドレスがすでに登録されています。")
        } else {
          await throwAlert("danger", "会員登録に失敗しました。")
        }
      }
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        if (isEdit) {
          const { displayName, photoURL } = userData
          setValues({ displayName, photoURL })
        }
      } catch (e) {}
    }

    loadData()
  }, [])

  return (
    <>
      <form className="form-table">
        <Input
          title="名前"
          name="displayName"
          value={values && values.displayName ? values.displayName : ""}
          placeholder="要約太郎"
          required={true}
          onChange={handleInputChange}
          errorMessage={errorTexts.displayName ? errorTexts.displayName : ""}
        />
        <Trimming
          setState={setState}
          title="ユーザーアイコン"
          required={true}
          userIcon={currentUser.photoURL}
          isEdit={isEdit}
        />
        {!isEdit && (
          <Input
            title="メールアドレス"
            name="email"
            value={values && values.email ? values.email : ""}
            placeholder="example@gmail.com"
            required={true}
            onChange={handleInputChange}
            errorMessage={errorTexts.email ? errorTexts.email : ""}
          />
        )}
        {!isEdit && (
          <>
            <Input
              title="パスワード"
              name="password"
              type="password"
              placeholder="六文字以上の全角半角の英数字"
              required={true}
              onChange={handleInputChange}
              errorMessage={errorTexts.password ? errorTexts.password : ""}
            />
          </>
        )}
        <div className="btn-area mgt-2 inline">{formatButton()}</div>
      </form>
    </>
  )
}

export default RegisterForm

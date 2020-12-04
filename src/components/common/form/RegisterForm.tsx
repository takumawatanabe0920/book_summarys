import React, { useState, useEffect, FC } from "react"
import { Input, Alert, Trimming } from "../../../components"
import { RegisterUser, ResultResponse, CurrentUser } from "../../../types"
import { stateFile } from "../../../components/common/form/Trimming"
import useAlertState from "../../../assets/hooks/useAlertState"
import { register, updateUser, uploadImage } from "../../../firebase/functions"

type Props = {
  isEdit?: boolean
  userData?: CurrentUser
}

const RegisterForm: FC<Props> = props => {
  const { isEdit, userData } = props
  const [values, setValues] = useState<RegisterUser>({})
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
        <button className="_btn submit" type="submit" onClick={onSubmit}>
          登録する
        </button>
      )
    }
  }

  const onSubmit = async (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    const { displayName, email, password, photoURL } = values
    if (!isEdit && (!displayName || !email || !password)) {
      return await throwAlert(
        "success",
        "名前とパスワードとメールを入力してください"
      )
    }
    if (window.confirm("会員登録しますか？")) {
      console.log(state)
      const resUpload: ResultResponse<any> = await uploadImage(
        state.blobFile,
        "user"
      )
      console.log(resUpload)
      if (resUpload.status === 200) {
        values.photoURL = resUpload.data
      } else {
        return await throwAlert("danger", "画像のアップロードに失敗しました。")
      }
      let resCreateOrUpdate: ResultResponse<RegisterUser>
      if (isEdit) {
        resCreateOrUpdate = await updateUser(
          userData.id,
          userData.login_id,
          displayName,
          photoURL
        )
      } else {
        resCreateOrUpdate = await register(
          email,
          password,
          displayName,
          photoURL
        )
      }
      if (isEdit) {
        if (resCreateOrUpdate && resCreateOrUpdate.status === 200) {
          await throwAlert("success", "会員情報を更新しました。")
        } else if (resCreateOrUpdate.status === 400) {
          await throwAlert("danger", "会員情報の更新に失敗しました。")
        }
      } else if (!isEdit) {
        if (resCreateOrUpdate && resCreateOrUpdate.status === 200) {
          await throwAlert("success", "会員情報に成功しました。")
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
    if (isEdit) {
      const { displayName, photoURL } = userData
      setValues({ displayName, photoURL })
    }
    closeAlert()
  }, [])

  return (
    <>
      <Alert
        is_show_alert={isShowAlert}
        alert_status={alertStatus}
        alert_text={alertText}
      />
      <form className="form-table">
        <Input
          title="名前"
          name="displayName"
          value={values && values.displayName ? values.displayName : ""}
          placeholder="要約太郎"
          required={true}
          onChange={handleInputChange}
        />
        <Trimming
          setState={setState}
          title="ユーザーアイコン"
          required={true}
        />
        {!isEdit && (
          <Input
            title="メールアドレス"
            name="email"
            value={values && values.email ? values.email : ""}
            placeholder="example@gmail.com"
            required={true}
            onChange={handleInputChange}
          />
        )}
        {!isEdit && (
          <Input
            title="パスワード"
            name="password"
            type="password"
            required={true}
            onChange={handleInputChange}
          />
        )}
        <div className="btn-area mgt-2 inline">{formatButton()}</div>
      </form>
    </>
  )
}

export default RegisterForm

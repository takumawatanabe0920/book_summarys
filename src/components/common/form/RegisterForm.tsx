import React, { useState, useEffect, FC } from "react"
import { Input, Alert } from "../../../components"
import { RegisterUser, ResultResponse, CurrentUser } from "../../../types"
import useAlertState from "../../../assets/hooks/useAlertState"
import { register } from "../../../firebase/functions"

type Props = {
  isEdit?: boolean
  userData?: CurrentUser
}

const RegisterForm: FC<Props> = props => {
  const { isEdit, userData } = props
  const [values, setValues] = useState<RegisterUser>({})
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

  const onSubmit = async (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    const { displayName, email, password, photoURL } = values
    if (!displayName || !email || !password) {
      return await throwAlert(
        "success",
        "名前とパスワードとメールを入力してください"
      )
    }
    if (window.confirm("会員登録しますか？")) {
      const resRegister: ResultResponse<RegisterUser> = await register(
        email,
        password,
        displayName,
        photoURL
      )
      console.log(resRegister)
      if (resRegister && resRegister.status === 200) {
        await throwAlert("success", "会員登録に成功しました。")
      } else if (
        resRegister.status === 400 &&
        resRegister.error === "user is exist"
      ) {
        await throwAlert("danger", "メールアドレスがすでに登録されています。")
      } else {
        await throwAlert("danger", "会員登録に失敗しました。")
      }
    }
  }

  useEffect(() => {
    if (isEdit) {
      const { displayName, login_id, photoURL, email } = userData
      setValues({ displayName, email, photoURL })
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
        <Input
          title="ユーザーアイコン"
          name="photoURL"
          value={values && values.photoURL ? values.photoURL : ""}
          onChange={handleInputChange}
        />
        <Input
          title="メールアドレス"
          name="email"
          value={values && values.email ? values.email : ""}
          placeholder="example@gmail.com"
          required={true}
          onChange={handleInputChange}
        />
        {!isEdit && (
          <Input
            title="パスワード"
            name="password"
            type="password"
            required={true}
            onChange={handleInputChange}
          />
        )}
        <div className="btn-area mgt-2 inline">
          <button className="_btn submit" type="submit" onClick={onSubmit}>
            登録する
          </button>
        </div>
      </form>
    </>
  )
}

export default RegisterForm

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Input, Alert } from "../../../components"
import { Login, ResultResponse } from "../../../types"
import { login } from "../../../firebase/functions"
import useAlertState from "../../../assets/hooks/useAlertState"
import useReactRouter from "use-react-router"

const LoginForm = () => {
  const [loginValues, setLogin] = useState<Login>({})
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
    setLogin({ ...loginValues, [name]: value })
  }

  const onSubmit = async (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    const { email, password } = loginValues
    if (!email || !password) {
      return await throwAlert("danger", "パスワードとメールを入力してください")
    }
    if (window.confirm("ログインしますか？")) {
      const resLogin: ResultResponse<Login> = await login(email, password)
      if (resLogin && resLogin.status === 200) {
        await throwAlert("success", "ログインしました。")
        history.replace(`/`)
      } else {
        await throwAlert("danger", "ログインに失敗しました。")
        history.replace(`/`)
      }
    }
  }

  return (
    <>
      <Alert
        is_show_alert={isShowAlert}
        alert_status={alertStatus}
        alert_text={alertText}
      />
      <form className="form-table">
        <Input
          title="メールアドレス"
          name="email"
          placeholder="example@gmail.com"
          required={true}
          onChange={handleInputChange}
        />
        <Input
          title="パスワード"
          name="password"
          type="password"
          required={true}
          onChange={handleInputChange}
        />
        <div className="_btns">
          <button className="_btn submit" type="submit" onClick={onSubmit}>
            ログインする
          </button>
          <Link to="/sign_up" className="_btn _sub-btn">
            会員登録ページへ
          </Link>
        </div>
      </form>
    </>
  )
}

export default LoginForm

import React, { useState, useEffect } from "react"
import { Input, Alert } from "../../../components"
import { Login } from "../../../types"
import { login } from "../../../firebase/functions"
import useAlertState from "../../../assets/hooks/useAlertState"

const LoginForm = () => {
  const [loginValues, setLogin] = useState<Login>({})
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
      login(email, password)
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
        <div className="btn-area mgt-2 inline">
          <button className="_btn submit" type="submit" onClick={onSubmit}>
            ログインする
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm

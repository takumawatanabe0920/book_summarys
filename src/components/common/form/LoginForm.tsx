import React, { useState, useEffect } from "react"
import { Input } from "../../../components"
import { Login } from "../../../types"
import { login } from "../../../firebase/functions"

const LoginForm = () => {
  const [loginValues, setLogin] = useState<Login>({})

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setLogin({ ...loginValues, [name]: value })
  }

  const onSubmit = (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    const { email, password } = loginValues
    if (!email || !password) {
      console.log("パスワードとメールを入力してください")
      return
    }
    if (window.confirm("ログインしますか？")) {
      login(email, password)
    }
  }

  return (
    <>
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

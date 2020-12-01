import React from "react"
import { Link } from "react-router-dom"
import { RegisterForm } from "./../../components"

const SignUpPage = () => {
  return (
    <>
      <div className="c-register">
        <div className="md-container">
          <h1 className="main-title blue-main-title">会員登録</h1>
          <RegisterForm isEdit={false} />
          <Link to="sign_in">ログイン</Link>
        </div>
      </div>
    </>
  )
}

export default SignUpPage

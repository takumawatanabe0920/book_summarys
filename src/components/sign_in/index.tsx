import React from "react"
import { Link } from "react-router-dom"
import { LoginForm } from "./../../components"

const SignInPage = () => {
  return (
    <>
      <div className="c-register">
        <div className="md-container">
          <div className="main-block _block-center mb3">
            <h1 className="main-title blue-main-title">ログイン</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInPage

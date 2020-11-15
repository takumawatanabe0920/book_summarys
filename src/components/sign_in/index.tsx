import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { LoginForm } from "./../../components"

const SignInPage = () => {
  return (
    <>
      <div className="c-register">
        <div className="md-container">
          <h1 className="main-title blue-main-title">ログイン</h1>
          <LoginForm />
          <Link to="/sign_up">会員登録</Link>
        </div>
      </div>
    </>
  )
}

export default SignInPage

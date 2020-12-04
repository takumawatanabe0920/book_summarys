import React from "react"
import { RegisterForm } from "./../../components"

const SignUpPage = () => {
  return (
    <div className="c-register">
      <div className="md-container">
        <div className="main-block _block-center">
          <h1 className="main-title blue-main-title mb3">会員登録</h1>
          <RegisterForm isEdit={false} />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

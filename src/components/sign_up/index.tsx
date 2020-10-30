import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import RegisterForm from "../common/form/RegisterForm"
import { CurrentUser } from "../../types/user"
import functions from "../../utils/functions"
const { getCurrentUser } = functions

const SignUpPage = () => {
  const [CurrentUser, setCurrentUser] = useState<CurrentUser>({})

  const mainContent = (props: CurrentUser) => {
    const isLoggedIn = !!props
    if (isLoggedIn) {
      return (
        <>
          <h1 className="main-title blue-main-title">MY PAGE</h1>
          <p>{CurrentUser.displayName}</p>
          <p>{CurrentUser.email}</p>
        </>
      )
    }
    return (
      <>
        <h1 className="main-title blue-main-title">会員登録</h1>
        <RegisterForm />
        <Link to="sign_in">ログイン</Link>
      </>
    )
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!unmounted) {
        const user: CurrentUser = getCurrentUser()
        console.log(user)
        setCurrentUser(user)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="c-register">
        <div className="md-container">{mainContent(CurrentUser)}</div>
      </div>
    </>
  )
}

export default SignUpPage

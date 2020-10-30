import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoginForm from "../common/form/LoginForm"
import { CurrentUser } from "../../types/user"
import functions from "../../utils/functions"
const { getCurrentUser } = functions

const SignInPage = () => {
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
        <h1 className="main-title blue-main-title">ログイン</h1>
        <LoginForm />
        <Link to="sign_in">会員登録</Link>
      </>
    )
  }

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!unmounted) {
        const user: CurrentUser = getCurrentUser()
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

export default SignInPage

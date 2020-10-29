import React, { useState, useEffect } from "react"
import RegisterForm from "../common/form/RegisterForm"
import firebase from "../../firebase/config.jsx"

const currentUser = firebase.auth().currentUser
console.log(currentUser)

const SignUpPage = () => {
  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!unmounted) {
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="c-register">
        <div className="md-container">
          <h1 className="main-title blue-main-title">会員登録</h1>
          <RegisterForm />
        </div>
      </div>
    </>
  )
}

export default SignUpPage

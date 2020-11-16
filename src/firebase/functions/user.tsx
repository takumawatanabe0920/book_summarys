import React from "react"
import axios from "axios"
import { CurrentUser } from "../../types/user"
import firebase from "../config"

//api
export const getUser = async (uid: string): Promise<any> => {
  const data = {
    headers: {
      Authorization: "Bearer 8213f5cd-5fds2-4891-83d0-48d172ffab77"
    },
    params: { uid }
  }
  const response = await axios
    .get("http://localhost:3012/v1/users", data)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err.response.data
    })
  return response
}

//firebase
export const getCurrentUser = (): CurrentUser => {
  const currentUserData = localStorage.getItem("user")
  const currentUser: CurrentUser = currentUserData
    ? JSON.parse(currentUserData)
    : ""
  return currentUser
}

export const register = async (
  email: string,
  password: string,
  displayName: string,
  photoURL: string
) => {
  // const user = await getUser(email)
  // if (user) {
  //   console.log("ユーザーが存在しています")
  //   return
  // }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async result => {
      await result.user.updateProfile({
        displayName,
        photoURL
      })
      await setUser()
    })
    .catch(error => {
      console.log("error")
    })
}

export const login = (email: string, password: string): void => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // ...
    })
  setUser()
}

export const logout = (): void => {
  firebase
    .auth()
    .signOut()
    .then(
      () => {
        // ログイン画面に戻る等
        console.log("ログアウトしました")
        deleteLocalStrage("user")
      },
      err => {
        // エラーを表示する等
        console.log(`ログアウト時にエラーが発生しました (${err})`)
      }
    )
}

//private
const setLocalStrage = (user: CurrentUser): void => {
  localStorage.setItem("user", JSON.stringify(user))
}

const deleteLocalStrage = (key: string): void => {
  localStorage.removeItem(key)
}

const setUser = (): void => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user)
      // User is signed in.
      const { uid, displayName, email, photoURL } = user
      const currentUser: CurrentUser = {
        uid,
        displayName,
        email,
        photoURL
      }
      setLocalStrage(currentUser)
    } else {
      console.log("not login")
    }
  })
}

//not use
export const emailAuthMixin_sendVerifyMail = () => {
  const currentUser = firebase.auth().currentUser
  if (!currentUser.emailVerified) {
    currentUser
      .sendEmailVerification()
      .then(() => {
        console.log("送信しました！")
      })
      .catch(error => {
        // 失敗した際の処理
      })
  }
}
import React from "react"
import axios from "axios"
import { User, CurrentUser, Login, ResultResponse, ResUser } from "../../types"
import { firebase } from "../config"

//api
export const getUser = async (
  uid: string
): Promise<ResultResponse<ResUser>> => {
  const data = {
    headers: {
      Authorization: "Bearer 8213f5cd-5fds2-4891-83d0-48d172ffab77"
    },
    params: { uid }
  }
  const response = await axios
    .get("http://localhost:3012/v1/users", data)
    .then(res => {
      return { status: 200, data: res.data }
    })
    .catch(error => {
      return { status: 400, error }
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

export const register = (
  email: string,
  password: string,
  displayName: string,
  photoURL: string
): Promise<ResultResponse<User>> => {
  // const user = await getUser(email)
  // if (user) {
  //   console.log("ユーザーが存在しています")
  //   return
  // }
  const response = firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async result => {
      await result.user.updateProfile({
        displayName,
        photoURL
      })
      await setUser()
      return { status: 200 }
    })
    .catch(error => {
      return { status: 400, error }
    })
  return response
}

export const login = (
  email: string,
  password: string
): Promise<ResultResponse<Login>> => {
  const response = firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async res => {
      await setUser()
      return { status: 200 }
    })
    .catch(error => {
      return { status: 400, error }
    })
  return response
}

export const logout = (): Promise<ResultResponse<Login>> => {
  const response = firebase
    .auth()
    .signOut()
    .then(async res => {
      await deleteLocalStrage("user")
      return { status: 200 }
    })
    .catch(error => {
      return { status: 400, error }
    })
  return response
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

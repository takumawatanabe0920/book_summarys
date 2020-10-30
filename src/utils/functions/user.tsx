import React from "react"
import { CurrentUser } from "../../types/user"
import firebase from "../../firebase/config.jsx"
const db = firebase.firestore()

export const getUser = (email: string) => {
  const user = db
    .collection("user")
    .doc(email)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data()
      } else {
        return ""
      }
    })
  return user
}

export const getCurrentUser = () => {
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
  const user = await getUser(email)
  if (user) {
    console.log("ユーザーが存在しています")
    return
  }
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
  //emailAuthMixin_sendVerifyMail()
}

export const login = (email: string, password: string) => {
  console.log(email, password)
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

//private
const setLocalStrage = (user: CurrentUser) => {
  localStorage.setItem("user", JSON.stringify(user))
}

const setUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      const { displayName, email, photoURL } = user
      const currentUser: CurrentUser = {
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

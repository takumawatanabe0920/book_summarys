import React from "react"
import firebase from "../../firebase/config.jsx"
const db = firebase.firestore()

export const getCurrentUser = async () => {
  console.log("called")
  // return currentUser
  let currentUser = {}
  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      const { displayName, email, photoURL } = user
      // console.log(user.email)
      // console.log(user.displayName)
      // console.log(user.photoURL)
      currentUser = {
        displayName,
        email,
        photoURL
      }
    } else {
      console.log("not login")
      // No user is signed in.
    }
  })
  return currentUser
}

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

export const register = async (email: string, password: string) => {
  const user = await getUser(email)
  if (user) {
    console.log("ユーザーが存在しています")
    return
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {})

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
}

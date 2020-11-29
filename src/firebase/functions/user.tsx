import React from "react"
const db = firebase.firestore()
import axios from "axios"
import {
  RegisterUser,
  CurrentUser,
  Login,
  ResultResponse,
  ResUser
} from "../../types"
import { firebase } from "../config"

//api
export const getUser = async (
  email: string
): Promise<ResultResponse<ResUser>> => {
  const data = {
    headers: {
      Authorization: "Bearer 8213f5cd-5fds2-4891-83d0-48d172ffab77"
    },
    params: { email }
  }
  const response = await axios
    .get("http://localhost:3012/v1/users", data)
    .then(res => {
      return { ...res.data }
    })
    .catch(error => {
      return { error }
    })
  return response
}

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
): Promise<ResultResponse<RegisterUser>> => {
  const resUser: ResultResponse<ResUser> = await getUser(email)
  if (resUser && resUser.data) {
    return { status: 400, error: "user is exist" }
  }
  const response = firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async result => {
      const user = db
        .collection("user")
        .add({
          displayName,
          photoURL,
          login_id: result.user.uid
        })
        .then(async res => {
          await setUser(res.id, "register")
        })
        .catch(error => {
          return { status: 400, error }
        })
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
    .then(
      async res => {
        await setUser(res.user.uid, "login")
        return { status: 200 }
      },
      err => {
        return { status: 400 }
      }
    )
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

const getIdUser = (id: string): Promise<ResultResponse<ResUser>> => {
  const response = db
    .collection("user")
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        const data = { id: doc.id, ...doc.data() }
        return { status: 200, data }
      }
    })
    .catch(error => {
      return { status: 400, error }
    })

  return response
}

const getUidUser = (uid: string): Promise<ResultResponse<ResUser[]>> => {
  const response = db
    .collection("user")
    .where("login_id", "==", uid)
    .get()
    .then(res => {
      let resData: ResUser[] = res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      return { status: 200, data: resData }
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

const setUser = async (
  id: string,
  type: string
): Promise<ResultResponse<ResUser>> => {
  let resUser: ResultResponse<ResUser | ResUser[]>
  if (type === "register") {
    resUser = await getIdUser(id)
  } else if (type === "login") {
    resUser = await getUidUser(id)
  }
  let user: ResUser
  if (resUser && resUser.status === 200) {
    user = Array.isArray(resUser.data) ? resUser.data[0] : resUser.data
  } else if (resUser && resUser.status === 400) {
    return { status: 400, error: "user is not find" }
  }
  firebase.auth().onAuthStateChanged(login => {
    if (login) {
      const { uid, email } = login
      const { id, displayName, photoURL } = user

      const currentUser: CurrentUser = {
        id,
        displayName,
        photoURL,
        login_id: {
          uid,
          email
        }
      }
      setLocalStrage(currentUser)
    } else {
      return { status: 400, error: "login is not yet" }
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

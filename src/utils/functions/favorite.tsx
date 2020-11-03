import React from "react"
import firebase from "../../firebase/config.jsx"
const db = firebase.firestore()
import { Favorite } from "../../types/favorite"

export const getFavorite = async (userId?: string, summaryId?: string) => {
  if (!userId) return
  if (!summaryId) return
  const snapShot = await db
    .collection("favorite")
    .where("user_id", "==", userId)
    .where("summary_id", "==", summaryId)
    .get()
    .then(res => {
      res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
    })

  return snapShot
}

export const getFavorites = () => {
  const snapShot = db
    .collection("favorite")
    .get()
    .then(res =>
      res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
    )

  return snapShot
}

export const getDonefavorite = (id: string) => {
  const snapShot = db
    .collection("category")
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data()
      } else {
        console.log("404")
      }
    })
    .catch(error => {
      console.log(`データを取得できませんでした (${error})`)
    })

  return snapShot
}

export const createFavorite = (values: Favorite) => {
  const { user_id, summary_id } = values
  if (!user_id || !summary_id) {
    console.log("idがありません")
    return
  }
  const snapShot = db
    .collection("favorite")
    .add({
      ...values
    })
    .then(res => {})

  return snapShot
}

export const deleteFavorite = (favoriteId: string) => {
  const snapShot = db
    .collection("favorite")
    .doc(favoriteId)
    .delete()
    .then(res => {})

  return snapShot
}

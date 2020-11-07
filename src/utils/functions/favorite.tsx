import React from "react"
import config from "../../firebase/config"
const { firebase } = config
const db = firebase.firestore()
import { Favorite } from "../../types/favorite"

export const getFavorite = (userId?: string, summaryId?: string) => {
  if (!userId) return
  if (!summaryId) return
  const snapShot = db
    .collection("favorite")
    .where("user_id", "==", userId)
    .where("summary_id", "==", summaryId)
    .get()
    .then(res =>
      res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
    )
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
    .collection("favorite")
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return { id: doc.id, ...doc.data() }
      } else {
        console.log("404")
      }
    })
    .catch(error => {
      console.log(`データを取得できませんでした (${error})`)
    })

  return snapShot
}

export const getfavoriteNum = async (summaryId?: string) => {
  const snapShot: any = await db
    .collection("favorite")
    .where("summary_id", "==", summaryId)
    .get()
    .then(res =>
      res.docs.map((doc, _index) => {
        let i = 1
        return i + _index
      })
    )
    .catch(error => {
      console.log(`データを取得できませんでした (${error})`)
    })
  const [num] = snapShot

  return num ? num : 0
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
    .then(res => res.id)

  return snapShot
}

export const deleteFavorite = (favoriteId: string) => {
  if (!favoriteId) {
    console.log("idが存在しません。")
    return
  }
  const snapShot = db
    .collection("favorite")
    .doc(favoriteId)
    .delete()
    .then(res => {})

  return snapShot
}

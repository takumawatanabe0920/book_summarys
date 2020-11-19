import React from "react"
import dayjs from "dayjs"
import { Browsing } from "../../types"
import firebase from "../config"
const db = firebase.firestore()
import { getSummaryBook } from "../functions"

export const createBrowsing = (values: Browsing) => {
  const { summary_id, user_id } = values
  if (!summary_id || !user_id) {
    if (!summary_id || !user_id) {
      return { status: 400, error: "summary_idかuser_idがありません。" }
    }
  }
  values.create_date = dayjs().unix()
  values.update_date = dayjs().unix()
  const response = db
    .collection("browsing")
    .add({
      ...values
    })
    .then(res => {
      return { id: res.id, status: 200 }
    })
    .catch(error => {
      console.log(error)
      return { status: 400 }
    })

  return response
}

export const getMyBrowsings = (userId?: string) => {
  const snapShot = db
    .collection("browsing")
    .where("user_id", "==", userId)
    //.orderBy("update_date")
    .get()
    .then(
      async res =>
        await Promise.all(
          res.docs.map(async doc => {
            let summary: any = await getSummaryBook(doc.data().summary_id)
            return { id: doc.id, ...doc.data(), summary_id: summary }
          })
        )
    )

  return snapShot
}

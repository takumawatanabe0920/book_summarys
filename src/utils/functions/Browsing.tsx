import React from "react"
import dayjs from "dayjs"
import { Browsing } from "../../types/browsing"
import firebase from "../../firebase/config"
const db = firebase.firestore()
import { getSummaryBook } from "./summary"
console.log(getSummaryBook)

export const createBrowsing = (values: Browsing) => {
  const { summary_id, user_id } = values
  if (!summary_id || !user_id) {
    console.log("no goot")
    return
  }
  values.create_date = dayjs().unix()
  values.update_date = dayjs().unix()
  const response = db
    .collection("browsing")
    .add({
      ...values
    })
    .then(res => {
      console.log({ id: res.id, status: 200 })
      return { id: res.id, status: 200 }
    })
    .catch(error => {
      return { status: 400 }
    })

  return response
}

export const getMyBrowsing = (userId?: string) => {
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

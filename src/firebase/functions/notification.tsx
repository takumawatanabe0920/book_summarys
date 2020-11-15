import React from "react"
import { Notification, ResSummaryComment } from "../../types"
import { getSummaryBook, getIdComment } from "../functions"
import firebase from "../config"
import dayjs from "dayjs"
const db = firebase.firestore()

export const createNotification = (values: Notification) => {
  const { target_id, type, user_id } = values
  if (!target_id || !type || !user_id) {
    console.log("not good")
    return
  }
  values.create_date = dayjs().unix()
  values.update_date = dayjs().unix()
  const response = db
    .collection("notification")
    .add({
      ...values
    })
    .then(res => {
      return { id: res.id, status: 200 }
    })
    .catch(error => {
      return { status: 400 }
    })

  return response
}

export const getMyNotifications = (user_id: string) => {
  const snapShot = db
    .collection("notification")
    .where("user_id", "==", user_id)
    //.orderBy("update_date")
    .get()
    .then(
      async res =>
        await Promise.all(
          res.docs.map(async doc => {
            const resSummary: void | { id: string } = await getSummaryBook(
              doc.data().target_id
            )
            let resSummaryComment: void | ResSummaryComment = {}
            if (!resSummary) {
              resSummaryComment = await getIdComment(doc.data().target_id)
            }
            return {
              id: doc.id,
              ...doc.data(),
              target_id: resSummary
                ? resSummary
                : resSummaryComment
                ? resSummaryComment
                : ""
            }
          })
        )
    )

  return snapShot
}

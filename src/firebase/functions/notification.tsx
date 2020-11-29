import React from "react"
import {
  Notification,
  ResultResponse,
  ResSummaryBook,
  ResSummaryComment
} from "../../types"
import { getSummaryBook, getIdComment } from "../functions"
import { firebase } from "../config"
import dayjs from "dayjs"
const db = firebase.firestore()

export const createNotification = (values: Notification) => {
  const { target_id, type, user_id } = values
  if (!target_id || !type || !user_id) {
    console.log("not good")
    return
  }
  values.is_read = false
  values.create_date = dayjs().unix()
  values.update_date = dayjs().unix()
  const response = db
    .collection("notification")
    .add({
      ...values
    })
    .then(res => {
      const data = { id: res.id }
      return { status: 200, data }
    })
    .catch(error => {
      return { status: 400, error }
    })

  return response
}

export const getMyNotifications = (user_id: string, type: string) => {
  const response = db
    .collection("notification")
    .where("user_id", "==", user_id)
    .where("type", "==", type)
    .orderBy("update_date", "desc")
    .get()
    .then(
      async res =>
        await Promise.all(
          res.docs.map(async doc => {
            const resSummary: ResultResponse<ResSummaryBook> = await getSummaryBook(
              doc.data().target_id
            )
            let summary: ResSummaryBook
            if (resSummary && resSummary.status === 200) {
              summary = resSummary.data
            }
            let summaryComment: ResSummaryComment
            if (!summary) {
              const resSummaryComment: ResultResponse<ResSummaryComment> = await getIdComment(
                doc.data().target_id
              )
              if (resSummaryComment && resSummaryComment.status === 200) {
                summaryComment = resSummaryComment.data
              }
            }
            return {
              id: doc.id,
              ...doc.data(),
              target_id:
                summary && summary.id
                  ? summary
                  : summaryComment && summaryComment.id
                  ? summaryComment
                  : ""
            }
          })
        )
    )

  return response
}

export const getMyNotReadNotificationsCount = (
  user_id: string
): Promise<number> => {
  const response = db
    .collection("notification")
    .where("user_id", "==", user_id)
    .where("is_read", "==", false)
    .get()
    .then(snap => {
      return snap.size
    })

  return response
}

export const updateReadNotifications = (
  user_id: string,
  type: string
): void => {
  const batch = db.batch()
  db.collection("notification")
    .where("user_id", "==", user_id)
    .where("type", "==", type)
    .where("is_read", "==", false)
    .get()
    .then(async res => {
      await Promise.all(
        res.docs.map(async (doc: any) => {
          let notificationRef = await db.collection("notification").doc(doc.id)
          console.log(notificationRef)
          console.log(doc)

          batch.update(notificationRef, { is_read: true })
        })
      )
      await batch.commit()
    })
    .catch(error => {})
}

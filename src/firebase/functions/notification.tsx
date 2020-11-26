import React from "react"
import {
  Notification,
  SummaryComment,
  ResultResponse,
  ResSummaryBook,
  ResNotification,
  ResultResponseList,
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
    //.orderBy("update_date")
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

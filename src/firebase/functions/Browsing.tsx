import React from "react"
// import dayjs from "dayjs"
import {
  Browsing,
  ResultResponse,
  ResultResponseList,
  ResSummaryBook,
  ResBrowsing
} from "../../types"
import { firebase } from "../config"
const db = firebase.firestore()
import { getSummaryBook } from "../functions"

export const createBrowsing = (values: Browsing) => {
  const { summary_id, user_id } = values
  if (!summary_id || !user_id) {
    return { status: 400, error: "summary_idかuser_idがありません。" }
  }
  values.create_date = firebase.firestore.Timestamp.now()
  values.update_date = firebase.firestore.Timestamp.now()
  const response = db
    .collection("browsing")
    .add({
      ...values
    })
    .then(res => {
      const data = { id: res.id }
      return { status: 200, data }
    })
    .catch(error => {
      return { status: 400 }
    })

  return response
}

export const getMyBrowsings = async (
  limit?: number,
  page?: number,
  userId?: string
): Promise<ResultResponseList<ResBrowsing>> => {
  if (!limit) return
  let data
  const skip = page - 1
  if (skip === 0) {
    data = skip
  } else {
    data = await db
      .collection("browsing")
      .where("user_id", "==", userId)
      .orderBy("update_date", "desc")
      .limit(limit * skip)
      .get()
      .then(
        documentresponses =>
          documentresponses.docs[documentresponses.docs.length - 1]
      )
  }
  let next
  if (!data) {
    next = await db
      .collection("browsing")
      .where("user_id", "==", userId)
      .orderBy("update_date", "desc")
      .endAt(data)
      .limit(limit)
      .get()
      .then(async res => {
        let resData: ResBrowsing[] = await Promise.all(
          res.docs.map(async doc => {
            const resSummary: ResultResponse<ResSummaryBook> = await getSummaryBook(
              doc.data().summary_id
            )
            let summary: ResSummaryBook
            if (resSummary && resSummary.status === 200) {
              summary = resSummary.data
            }
            return { id: doc.id, ...doc.data(), summary_id: summary }
          })
        )
        return { status: 200, data: resData }
      })
      .catch(function(error) {
        console.log(error)
        return { status: 400, error }
      })
  } else {
    next = await db
      .collection("browsing")
      .where("user_id", "==", userId)
      .orderBy("update_date", "desc")
      .startAfter(data)
      .limit(limit)
      .get()
      .then(async res => {
        let resData: ResBrowsing[] = await Promise.all(
          res.docs.map(async doc => {
            const resSummary: ResultResponse<ResSummaryBook> = await getSummaryBook(
              doc.data().summary_id
            )
            let summary: ResSummaryBook
            if (resSummary && resSummary.status === 200) {
              summary = resSummary.data
            }
            return { id: doc.id, ...doc.data(), summary_id: summary }
          })
        )
        return { status: 200, data: resData }
      })
      .catch(function(error) {
        console.log(error)
        return { status: 400, error }
      })
  }

  return next
}

export const getMyBrowsingsCount = (userId?: string): Promise<number> => {
  const snapShot = db
    .collection("browsing")
    .where("user_id", "==", userId)
    .get()
    .then(snap => {
      return snap.size
    })
    .catch(error => {
      console.log(error)
      return 0
    })

  return snapShot
}

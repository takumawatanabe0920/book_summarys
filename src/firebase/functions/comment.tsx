import React from "react"
// import dayjs from "dayjs"
import {
  SummaryComment,
  ResSummaryComment,
  ResultResponse,
  ResultResponseList,
  ResSummaryBook,
  ResUser,
  SummaryBook
} from "../../types"
import { firebase } from "../config"
import { getSummaryBook, getIdUser } from "./"
const db = firebase.firestore()

export const createSummaryComment = (
  values: SummaryComment
): Promise<ResultResponse<ResSummaryComment>> => {
  values.create_date = firebase.firestore.Timestamp.now()
  values.update_date = firebase.firestore.Timestamp.now()

  const response = db
    .collection("summaryComment")
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

export const getSummaryComments = (
  summaryId?: string
): Promise<ResultResponseList<ResSummaryComment>> => {
  const response = db
    .collection("summaryComment")
    .where("summary_id", "==", summaryId)
    .orderBy("update_date")
    .get()
    .then(async res => {
      let resData: ResSummaryComment[] = await Promise.all(
        res.docs.map(async doc => {
          const resUser: ResultResponse<ResUser> = await getIdUser(
            doc.data().user_id
          )
          let user: ResUser
          if (resUser && resUser.status === 200) {
            user = resUser.data
          }
          return { id: doc.id, ...doc.data(), user_id: user }
        })
      )
      return { status: 200, data: resData }
    })
    .catch(function(error) {
      console.log(error)
      return { status: 400, error }
    })

  return response
}

export const getMyComments = async (
  limit?: number,
  page?: number,
  userId?: string
): Promise<ResultResponseList<ResSummaryComment>> => {
  if (!limit) return
  let data
  const skip = page - 1
  if (skip === 0) {
    data = skip
  } else {
    data = await db
      .collection("summaryComment")
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
      .collection("summaryComment")
      .where("user_id", "==", userId)
      .orderBy("update_date", "desc")
      .endAt(data)
      .limit(limit)
      .get()
      .then(async res => {
        let resData: ResSummaryComment[] = await Promise.all(
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
      .collection("summaryComment")
      .where("user_id", "==", userId)
      .orderBy("update_date", "desc")
      .startAfter(data)
      .limit(limit)
      .get()
      .then(async res => {
        let resData: ResSummaryComment[] = await Promise.all(
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

export const getMyCommentCount = (userId?: string): Promise<number> => {
  const snapShot = db
    .collection("summaryComment")
    .where("user_id", "==", userId)
    .orderBy("update_date", "desc")
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

export const getIdComment = (
  id?: string
): Promise<ResultResponse<ResSummaryComment>> => {
  const response = db
    .collection("summaryComment")
    .doc(id)
    //.orderBy("update_date")
    .get()
    .then(async doc => {
      if (doc.exists) {
        const resSummary = await getSummaryBook(doc.data().summary_id)
        let summary: ResSummaryBook = {}
        if (resSummary && resSummary.status === 200) {
          summary = resSummary.data
        }
        const data = { id: doc.id, ...doc.data(), summary_id: summary }
        return { status: 200, data }
      }
    })
    .catch(error => {
      return { status: 400, error }
    })

  return response
}

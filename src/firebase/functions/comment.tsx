import React from "react"
import dayjs from "dayjs"
import {
  SummaryComment,
  ResSummaryComment,
  ResultResponse,
  ResultResponseList,
  ResSummaryBook
} from "../../types"
import { firebase } from "../config"
import { getSummaryBook } from "./"
const db = firebase.firestore()

export const createSummaryComment = (
  values: SummaryComment
): Promise<ResultResponse<ResSummaryComment>> => {
  values.create_date = dayjs().unix()
  values.update_date = dayjs().unix()

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

export const getSummaryComment = (
  summaryId?: string
): Promise<ResultResponseList<ResSummaryComment>> => {
  const response = db
    .collection("summaryComment")
    .where("summary_id", "==", summaryId)
    .orderBy("update_date")
    .get()
    .then(res => {
      let resData: ResSummaryComment[] = res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      return { status: 200, data: resData }
    })
    .catch(function(error) {
      return { status: 400, error }
    })

  return response
}

export const getMyComments = (
  user_id?: string
): Promise<ResultResponseList<ResSummaryComment>> => {
  const response = db
    .collection("summaryComment")
    .where("user_id", "==", user_id)
    .orderBy("update_date", "desc")
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
      return { status: 400, error }
    })

  return response
}

export const getIdComment = (
  id?: string
): Promise<ResultResponse<ResSummaryComment>> => {
  const response = db
    .collection("summaryComment")
    .doc(id)
    //.orderBy("update_date")
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

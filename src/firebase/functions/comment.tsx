import React from "react"
import dayjs from "dayjs"
import {
  SummaryComment,
  ResSummaryComment,
  ResultResponse,
  ResultResponseList
} from "../../types"
import firebase from "../config"
const db = firebase.firestore()

export const createSummaryComment = (
  values: SummaryComment
): Promise<ResultResponse<SummaryComment>> => {
  values.create_date = dayjs().unix()
  values.update_date = dayjs().unix()

  const response = db
    .collection("summaryComment")
    .add({
      ...values
    })
    .then(res => {
      return { id: res.id, status: 200 }
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
    //.orderBy("update_date")
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

export const getMyComment = (
  userId?: string
): Promise<ResultResponseList<ResSummaryComment>> => {
  const response = db
    .collection("summaryComment")
    .where("user_id", "==", userId)
    //.orderBy("update_date")
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

export const getIdComment = (
  id?: string
): Promise<ResultResponse<SummaryComment>> => {
  const response = db
    .collection("summaryComment")
    .doc(id)
    //.orderBy("update_date")
    .get()
    .then(doc => {
      if (doc.exists) {
        return { id: doc.id, status: 200, ...doc.data() }
      }
    })
    .catch(error => {
      return { status: 400, error }
    })

  return response
}

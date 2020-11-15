import React from "react"
import dayjs from "dayjs"
import { SummaryComment, ResSummaryComment } from "../../types"
import firebase from "../config"
const db = firebase.firestore()

export const createSummaryComment = (values: SummaryComment) => {
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
      console.log(error)
      return { status: 400 }
    })

  return response
}

export const getSummaryComment = (summaryId?: string) => {
  const snapShot = db
    .collection("summaryComment")
    .where("summary_id", "==", summaryId)
    //.orderBy("update_date")
    .get()
    .then(res =>
      res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
    )

  return snapShot
}

export const getMyComment = (userId?: string) => {
  const snapShot = db
    .collection("summaryComment")
    .where("user_id", "==", userId)
    //.orderBy("update_date")
    .get()
    .then(res =>
      res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
    )

  return snapShot
}

export const getIdComment = (
  id?: string
): Promise<void | ResSummaryComment> => {
  const snapShot = db
    .collection("summaryComment")
    .doc(id)
    //.orderBy("update_date")
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

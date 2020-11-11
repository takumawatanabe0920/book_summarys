import React from "react"
import { SummaryBook } from "./../../types/summary"
import firebase from "../../firebase/config"
import dayjs from "dayjs"
const db = firebase.firestore()

export const createSummary = (values: SummaryBook) => {
  const { title, content, category, user_id } = values
  if (!title || !content || !category || !user_id) {
    return
  }
  values.create_date = dayjs().unix()
  values.update_date = dayjs().unix()
  const response = db
    .collection("summary")
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

export const getSummaries = async (limit?: number, page?: number) => {
  if (!limit) return []
  let data
  const skip = page - 1
  if (skip === 0) {
    data = skip
  } else {
    data = await db
      .collection("summary")
      .orderBy("update_date")
      .limit(limit * skip)
      .get()
      .then(
        documentSnapshots =>
          documentSnapshots.docs[documentSnapshots.docs.length - 1]
      )
  }

  const next = await db
    .collection("summary")
    .orderBy("update_date")
    .startAfter(data)
    .limit(limit)
    .get()
    .then(res =>
      res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
    )
  return next
}

export const getSummariesCount = async () => {
  let docNum = await db
    .collection("summary")
    .get()
    .then(snap => {
      return snap.size // will return the collection size
    })

  return docNum
}

export const getSummaryBook = (id: string) => {
  const snapShot = db
    .collection("summary")
    .doc(id)
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

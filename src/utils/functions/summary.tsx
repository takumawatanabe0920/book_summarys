import React from "react"
import firebase from "../../firebase/config.jsx"
const db = firebase.firestore()

export const createSummary = (values: {}) => {
  db.collection("summary")
    .add({
      values
    })
    .then(res => {})
    .catch(error => {})
}

export const getSummaries = () => {
  const snapShot = db
    .collection("summary")
    .get()
    .then(res =>
      res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
    )

  return snapShot
}

export const getSummaryBook = (id: string) => {
  const snapShot = db
    .collection("summary")
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data().values
      } else {
        console.log("404")
      }
    })
    .catch(error => {
      console.log(`データを取得できませんでした (${error})`)
    })

  return snapShot
}

import React from "react"
import {
  SummaryBook,
  ResSummaryBook,
  ResultResponseList,
  ResultResponse,
  ResCategory
} from "../../types"
import { firebase } from "../config"
import dayjs from "dayjs"
import { getCategory, getSubCategory } from "./"
const db = firebase.firestore()

export const createSummary = (
  values: SummaryBook
): Promise<ResultResponse<ResSummaryBook>> => {
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
      const data = { id: res.id }
      return { status: 200, data }
    })
    .catch(error => {
      return { status: 400, data: error }
    })

  return response
}

export const updateFavoriteSummaries = async (
  favorite_id?: string,
  summary_id?: string
): Promise<void> => {
  const sfDocRef = db.collection("summary").doc(summary_id)
  db.runTransaction(transaction => {
    return transaction.get(sfDocRef).then(doc => {
      let favArray = doc.data().favorite_id
      let isDoneFavorite: boolean = favArray.includes(favorite_id)
      if (isDoneFavorite) {
        let index = favArray.indexOf(favorite_id)
        if (index > -1) {
          favArray.splice(index, 1)
        }
      } else {
        favArray.push(favorite_id)
      }
      transaction.update(sfDocRef, {
        favorite_id: favArray,
        favorite_count: favArray.length
      })
    })
  })
    .then(function(newPopulation) {
      console.log("Population increased to ", newPopulation)
    })
    .catch(function(err) {
      // This will be an "population is too big" error.
      console.error(err)
    })
}

export const getRankingSummaries = async (
  limit?: number
): Promise<ResultResponseList<ResSummaryBook>> => {
  const response = await db
    .collection("summary")
    .orderBy("favorite_count", "desc")
    .limit(limit)
    .get()
    .then(async res => {
      let resData: ResSummaryBook[] = await Promise.all(
        res.docs.map(async doc => {
          const [resCategory, resSubCategory] = await Promise.all([
            await getCategory(doc.data().category),
            await getSubCategory(doc.data().sub_category)
          ])
          let category: ResCategory
          if (resCategory && resCategory.status === 200) {
            category = resCategory.data
          }
          let sub_category: ResCategory
          if (resSubCategory && resSubCategory.status === 200) {
            sub_category = resSubCategory.data
          }

          return { id: doc.id, ...doc.data(), category, sub_category }
        })
      )
      return { status: 200, data: resData }
    })
    .catch(function(error) {
      return { status: 400, error }
    })
  return response
}

export const getSummaries = async (
  limit?: number,
  page?: number
): Promise<ResultResponseList<ResSummaryBook>> => {
  const startTime = performance.now() // 開始時間
  if (!limit) return
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
        documentresponses =>
          documentresponses.docs[documentresponses.docs.length - 1]
      )
  }

  const next = await db
    .collection("summary")
    .orderBy("update_date")
    .startAfter(data)
    .limit(limit)
    .get()
    .then(async res => {
      let resData: ResSummaryBook[] = await Promise.all(
        res.docs.map(async doc => {
          const [resCategory, resSubCategory] = await Promise.all([
            await getCategory(doc.data().category),
            await getSubCategory(doc.data().sub_category)
          ])
          let category: ResCategory
          if (resCategory && resCategory.status === 200) {
            category = resCategory.data
          }
          let sub_category: ResCategory
          if (resSubCategory && resSubCategory.status === 200) {
            sub_category = resSubCategory.data
          }

          return { id: doc.id, ...doc.data(), category, sub_category }
        })
      )
      return { status: 200, data: resData }
    })
    .catch(function(error) {
      return { status: 400, error }
    })
  const endTime = performance.now() // 終了時間
  console.log(endTime - startTime) // 何ミリ秒かかったかを表示する
  return next
}

export const getSelectCategorySummaries = async (
  limit?: number,
  page?: number,
  category_id?: string
): Promise<ResultResponseList<ResSummaryBook>> => {
  const startTime = performance.now() // 開始時間
  if (!limit) return
  let data
  const skip = page - 1
  if (skip === 0) {
    data = skip
  } else {
    data = await db
      .collection("summary")
      .where("category", "==", category_id)
      .orderBy("update_date")
      .limit(limit * skip)
      .get()
      .then(
        documentresponses =>
          documentresponses.docs[documentresponses.docs.length - 1]
      )
  }

  console.log(data)
  if (data === undefined) {
    return { status: 400 }
  }

  const next = await db
    .collection("summary")
    .where("category", "==", category_id)
    .orderBy("update_date")
    .startAfter(data)
    .limit(limit)
    .get()
    .then(async res => {
      let resData: ResSummaryBook[] = await Promise.all(
        res.docs.map(async doc => {
          const [resCategory, resSubCategory] = await Promise.all([
            await getCategory(doc.data().category),
            await getSubCategory(doc.data().sub_category)
          ])
          let category: ResCategory
          if (resCategory && resCategory.status === 200) {
            category = resCategory.data
          }
          let sub_category: ResCategory
          if (resSubCategory && resSubCategory.status === 200) {
            sub_category = resSubCategory.data
          }

          return { id: doc.id, ...doc.data(), category, sub_category }
        })
      )
      return { status: 200, data: resData }
    })
    .catch(function(error) {
      return { status: 400, error }
    })
  const endTime = performance.now() // 終了時間
  console.log(endTime - startTime) // 何ミリ秒かかったかを表示する
  return next
}

export const getSummariesCount = async (): Promise<number> => {
  let docNum = await db
    .collection("summary")
    .get()
    .then(snap => {
      return snap.size // will return the collection size
    })

  return docNum
}

export const getCategorySummariesCount = async (
  category_id?: string
): Promise<number> => {
  let docNum = await db
    .collection("summary")
    .where("category", "==", category_id)
    .get()
    .then(snap => {
      return snap.size // will return the collection size
    })

  return docNum
}

export const getSummaryBook = (
  id: string
): Promise<ResultResponse<ResSummaryBook>> => {
  const response = db
    .collection("summary")
    .doc(id)
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

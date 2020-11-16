import React from "react"
import {
  ResCategory,
  Category,
  ResultResponse,
  ResultResponseList
} from "../../types"
import firebase from "../config"
const db = firebase.firestore()

export const getCategories = (): Promise<ResultResponseList<ResCategory>> => {
  const response = db
    .collection("category")
    .get()
    .then(res => {
      let resData: ResCategory[] = res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      return { status: 200, data: resData }
    })
    .catch(error => {
      return { status: 400, error }
    })

  return response
}

export const getCategory = (id: string): Promise<ResultResponse<Category>> => {
  const response = db
    .collection("category")
    .doc(id)
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

export const getSubCategories = (): Promise<ResultResponseList<
  ResCategory
>> => {
  const response = db
    .collection("sub_category")
    .get()
    .then(res => {
      let resData: ResCategory[] = res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      return { status: 200, data: resData }
    })
    .catch(error => {
      return { status: 400, error }
    })

  return response
}

export const getSubCategory = (
  id: string
): Promise<ResultResponse<Category>> => {
  const response = db
    .collection("sub_category")
    .doc(id)
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

export const categoryLinkingSubCategory = async (
  categoryId?: string
): Promise<ResultResponseList<ResCategory>> => {
  const response = await db
    .collection("sub_category")
    .where("category_id", "==", categoryId)
    .get()
    .then(res => {
      let resData: ResCategory[] = res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      return { status: 200, data: resData }
    })
    .catch(error => {
      return { status: 400, error }
    })
  return response
}

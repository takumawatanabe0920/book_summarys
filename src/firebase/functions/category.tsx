import React from "react"
import { ResCategory, ResultResponse, ResultResponseList } from "../../types"
import { responseUploadImage } from "./"
import { firebase } from "../config"
const db = firebase.firestore()

export const getCategories = (): Promise<ResultResponseList<ResCategory>> => {
  const response = db
    .collection("category")
    .orderBy("display_order")
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

export const getCategoriesPopulateImage = (): Promise<ResultResponseList<
  ResCategory
>> => {
  const response = db
    .collection("category")
    .orderBy("display_order")
    .get()
    .then(async res => {
      let resData: ResCategory[] = await await Promise.all(
        res.docs.map(async doc => {
          const resCategoryImage: string = await responseUploadImage(
            doc.data().image
          )
          return { id: doc.id, ...doc.data(), image: resCategoryImage }
        })
      )
      return { status: 200, data: resData }
    })
    .catch(error => {
      return { status: 400, error }
    })

  return response
}

export const getCategory = (
  id: string
): Promise<ResultResponse<ResCategory>> => {
  const response = db
    .collection("category")
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
): Promise<ResultResponse<ResCategory>> => {
  const response = db
    .collection("sub_category")
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

export const categoryLinkingSubCategory = async (
  categoryId?: string
): Promise<ResultResponseList<ResCategory>> => {
  const response = await db
    .collection("sub_category")
    .where("category_id", "==", categoryId)
    .orderBy("display_order", "desc")
    .get()
    .then(res => {
      let resData: ResCategory[] = res.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      return { status: 200, data: resData }
    })
    .catch(error => {
      console.log(error)
      return { status: 400, error }
    })
  return response
}

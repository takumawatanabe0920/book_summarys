import React from "react"
import dayjs from "dayjs"
import { useLocation } from "react-router-dom"
import { firebase, storage } from "./../../firebase/config"
import { ResultResponse } from "./../../types"

export const readQuery = (key?: string): string => {
  return new URLSearchParams(useLocation().search).get(key)
}

export const formatDateHour = (
  _datetime?: firebase.firestore.Timestamp
): string => {
  const dateTime = _datetime.seconds
  return dateTime ? dayjs.unix(dateTime).format("YYYY-MM-DD HH:mm:ss") : ""
}

export const uploadImage = (
  image: File,
  path: string
): Promise<ResultResponse<any>> => {
  const response = storage
    .ref(`/images/${path}/${image.name}`)
    .put(image)
    .then(res => {
      return { status: 200, data: `/images/${path}/${image.name}` }
    })
    .catch(error => {
      return { status: 400, error }
    })
  return response
}

export const getImage = (_imgPath: string): Promise<ResultResponse<string>> => {
  if (_imgPath.match(/^\https:/)) return
  if (!_imgPath) return
  const ref = firebase
    .storage()
    .ref()
    .child(_imgPath)

  const response = ref
    .getDownloadURL()
    .then(url => {
      return { status: 200, data: url }
    })
    .catch(error => {
      return { status: 400, error }
    })
  return response
}

export const responseUploadImage = async (
  _photoUrl: string
): Promise<string> => {
  if (!_photoUrl) return
  const resUploadImage = await getImage(_photoUrl)
  if (resUploadImage && resUploadImage.status === 200) {
    return resUploadImage.data ? resUploadImage.data : ""
  }
}

import React from "react"
export type User = Partial<{
  displayName: string
  photoURL: string
  email: string
  password: string
}>

export type CurrentUser = Partial<{
  uid: string
  displayName: string
  photoURL: string
  email: string
}>

export type Login = Partial<{
  email: string
  password: string
}>

export type ResUser = User & {
  uid?: string
}

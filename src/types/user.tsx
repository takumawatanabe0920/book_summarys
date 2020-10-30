export type User = Partial<{
  displayName: string
  photoURL: string
  email: string
  password: string
}>

export type CurrentUser = Partial<{
  displayName: string
  photoURL: string
  email: string
}>

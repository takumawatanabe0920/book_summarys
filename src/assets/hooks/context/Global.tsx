import React, { useState, FC } from "react"
import { getCurrentUser } from "../../../firebase/functions"
import { ResUser as CurrentUser } from "./../../../types"
const user: CurrentUser = getCurrentUser()

type ContextState = {
  currentUser: CurrentUser
  setCurrentUser: React.Dispatch<React.SetStateAction<Partial<CurrentUser>>>
  notificationCount: number
  setNotificationCount: React.Dispatch<React.SetStateAction<number>>
}

export const GlobalContext = React.createContext({} as ContextState)

export const GlobalProvider: FC<any> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [notificationCount, setNotificationCount] = useState<number>(0)

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        notificationCount,
        setNotificationCount
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

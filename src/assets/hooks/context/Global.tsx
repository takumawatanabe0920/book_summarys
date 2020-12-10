import React, { useState, FC } from "react"
import { getCurrentUser } from "../../../firebase/functions"
import { ResUser as CurrentUser } from "./../../../types"
const user: CurrentUser = getCurrentUser()

type ContextState = {
  currentUser: CurrentUser
  setCurrentUser: React.Dispatch<React.SetStateAction<Partial<CurrentUser>>>
  notificationCount: number
  setNotificationCount: React.Dispatch<React.SetStateAction<number>>
  alertState: boolean
  setAlertState: React.Dispatch<React.SetStateAction<boolean>>
  alertStatus: string
  setAlertStatus: React.Dispatch<React.SetStateAction<string>>
  alertText: string
  setAlertText: React.Dispatch<React.SetStateAction<string>>
}

export const GlobalContext = React.createContext({} as ContextState)

export const GlobalProvider: FC<any> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [notificationCount, setNotificationCount] = useState<number>(0)
  const [alertState, setAlertState] = useState<boolean>(false)
  const [alertStatus, setAlertStatus] = useState<string>("")
  const [alertText, setAlertText] = useState<string>("")

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        notificationCount,
        setNotificationCount,
        alertState,
        setAlertState,
        alertStatus,
        setAlertStatus,
        alertText,
        setAlertText
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

import { useEffect, useState, useCallback, useContext } from "react"
import { GlobalContext } from "./../../assets/hooks/context/Global"

const useAlertState = (
  _isOpen: boolean
): [boolean, string, string, any, any] => {
  const {
    alertState,
    setAlertState,
    alertStatus,
    setAlertStatus,
    alertText,
    setAlertText
  } = useContext(GlobalContext)

  const throwAlert = useCallback(
    (_status: string, _text: string): void => {
      setAlertState(true)
      setAlertText(_text)
      setAlertStatus(_status)
      setTimeout(() => {
        setAlertState(false)
      }, 3500)
    },
    [setAlertState]
  )

  const setFalse = useCallback((): void => {
    setAlertState(false)
  }, [setAlertState])

  return [alertState, alertStatus, alertText, throwAlert, setFalse]
}

export default useAlertState

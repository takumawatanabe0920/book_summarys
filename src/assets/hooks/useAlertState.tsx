import { useEffect, useState, useCallback } from "react"

const useAlertState = (
  _isOpen: boolean
): [boolean, string, string, any, any] => {
  const [state, setState] = useState(_isOpen)
  const [status, setStatus] = useState("")
  const [text, setText] = useState("")

  const throwAlert = useCallback(
    (_status: string, _text: string): void => {
      setState(true)
      setText(_text)
      setStatus(_status)
      setTimeout(() => {
        setState(false)
      }, 3500)
    },
    [setState]
  )

  const setFalse = useCallback((): void => {
    setState(false)
  }, [setState])

  return [state, status, text, throwAlert, setFalse]
}

export default useAlertState

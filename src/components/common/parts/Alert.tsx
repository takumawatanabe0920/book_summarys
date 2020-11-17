import React, { useEffect, useState, FC } from "react"

type props = {
  is_show_alert: boolean
  alert_status: string
  alert_text: string
}

const Alert: FC<props> = props => {
  const { is_show_alert, alert_status, alert_text } = props

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!unmounted) {
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      {is_show_alert && (
        <div
          className={[
            "alertContainer",
            alert_status && alert_status === "success" ? "success" : "danger"
          ].join(" ")}
        >
          <p className="alert_txt">{alert_text}</p>
        </div>
      )}
    </>
  )
}

export default Alert

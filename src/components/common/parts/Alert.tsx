import React, { FC, useContext } from "react"
import { GlobalContext } from "./../../../assets/hooks/context/Global"

type props = {
  is_show_alert?: boolean
  alert_status?: string
  alert_text?: string
}

const Alert: FC<props> = props => {
  //const { is_show_alert, alert_status, alert_text } = props
  const { alertState, alertStatus, alertText } = useContext(GlobalContext)

  return (
    <>
      {alertState && (
        <div
          className={[
            "alertContainer",
            alertStatus && alertStatus === "success" ? "success" : "danger"
          ].join(" ")}
        >
          <p className="alert_txt">{alertText}</p>
        </div>
      )}
    </>
  )
}

export default Alert

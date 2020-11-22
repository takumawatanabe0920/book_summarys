import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useReactRouter from "use-react-router"
import { CurrentUser, ResultResponse, Login } from "../../types"
import { Alert } from "./../../components"
import { ResBrowsing } from "../../types/browsing"
import {
  getCurrentUser,
  logout,
  getMyBrowsings,
  formatDateHour
} from "../../firebase/functions"
import useAlertState from "./../../assets/hooks/useAlertState"
const user: CurrentUser = getCurrentUser()

const Mypage = () => {
  const [CurrentUser, setCurrentUser] = useState<CurrentUser>({})
  const [myBrowings, setMyBrowings] = useState<ResBrowsing[]>([])
  const [
    isShowAlert,
    alertStatus,
    alertText,
    throwAlert,
    closeAlert
  ] = useAlertState(false)
  const { history } = useReactRouter()

  const handleLogout = async () => {
    if (window.confirm("ログインしますか？")) {
      const resLogout: ResultResponse<Login> = await logout()
      if (resLogout && resLogout.status === 200) {
        await throwAlert("success", "ログアウトしました。")
        history.replace(`/`)
      } else {
        await throwAlert("danger", "ログアウトが失敗しました。")
      }
    }
  }

  useEffect(() => {
    let unmounted = false
    closeAlert()
    ;(async () => {
      let resBrowing: ResBrowsing[]
      if (user) {
        resBrowing = await getMyBrowsings(user.uid)
      }
      if (!unmounted) {
        setMyBrowings(resBrowing)
        setCurrentUser(user)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <Alert
        is_show_alert={isShowAlert}
        alert_status={alertStatus}
        alert_text={alertText}
      />
      <div className="c-register">
        <div className="md-container">
          <div className="user-mypage">
            <h1 className="main-title blue-main-title">MY PAGE</h1>
            <p>{CurrentUser.displayName}</p>
            <p>{CurrentUser.email}</p>
            <button onClick={handleLogout}>ログアウト</button>

            <h3>最近見た記事</h3>
            {myBrowings &&
              myBrowings.map((browing: ResBrowsing) => {
                return (
                  <div key={browing.id}>
                    <dl>
                      <dt>記事</dt>
                      <dd>{browing.summary_id && browing.summary_id.title}</dd>
                    </dl>
                    <dl>
                      <dt>閲覧日時</dt>
                      <dd>{formatDateHour(browing.update_date)}</dd>
                    </dl>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Mypage

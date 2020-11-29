import React, { useState, useEffect, FC } from "react"
import { Link } from "react-router-dom"
import useReactRouter from "use-react-router"
import clsx from "clsx"
import { ResUser, ResultResponse, Login } from "../../../../types"
import { Alert } from "../../.."
import { logout } from "../../../../firebase/functions"
import useAlertState from "../../../../assets/hooks/useAlertState"

type Props = {
  user: ResUser
}

const MypageSidebar: FC<Props> = props => {
  const { user } = props
  const { history } = useReactRouter()
  const [currentTab, setCurrentTab] = useState<string>()
  const [
    isShowAlert,
    alertStatus,
    alertText,
    throwAlert,
    closeAlert
  ] = useAlertState(false)

  const handleLogout = async () => {
    if (window.confirm("ログアウトしますか？")) {
      const resLogout: ResultResponse<Login> = await logout()
      if (resLogout && resLogout.status === 200) {
        await throwAlert("success", "ログアウトしました。")
        history.replace(`/`)
      } else {
        await throwAlert("danger", "ログアウトが失敗しました。")
      }
    }
  }

  const handleChangeTab = (_tabType: string): void => {
    setCurrentTab(_tabType)
  }

  const isActive = (_tabType: string) => {
    if (currentTab === _tabType) {
      return "active"
    }
  }

  useEffect(() => {
    let unmounted = false
    closeAlert()
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
      <Alert
        is_show_alert={isShowAlert}
        alert_status={alertStatus}
        alert_text={alertText}
      />
      <div className="_side-block">
        {user && user.id && (
          <Link
            to={`/mypage/${user.id}/edit`}
            className={clsx("_side-item", isActive("user_edit"))}
            onClick={() => handleChangeTab("user_edit")}
          >
            ユーザー情報を編集
          </Link>
        )}
        <Link
          to={`/mypage/${user.id}/summaries`}
          className={clsx("_side-item", isActive("summaries"))}
          onClick={() => handleChangeTab("summaries")}
        >
          投稿記事
        </Link>
        <Link
          to={`/mypage/${user.id}/browsings`}
          className={clsx("_side-item", isActive("browsings"))}
          onClick={() => handleChangeTab("browsings")}
        >
          閲覧履歴
        </Link>
        <Link
          to={`/mypage/${user.id}/favorites`}
          className={clsx("_side-item", isActive("favorites"))}
          onClick={() => handleChangeTab("favorites")}
        >
          いいね
        </Link>
        <Link
          to={`/mypage/${user.id}/comments`}
          className={clsx("_side-item", isActive("comments"))}
          onClick={() => handleChangeTab("comments")}
        >
          コメント
        </Link>
        <div
          className={clsx("_side-item", isActive("logout"))}
          onClick={() => {
            handleChangeTab("logout")
            handleLogout()
          }}
        >
          ログアウト
        </div>
      </div>
    </>
  )
}

export default MypageSidebar

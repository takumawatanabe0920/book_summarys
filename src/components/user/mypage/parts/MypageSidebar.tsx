import React, { useState, useEffect, FC, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import useReactRouter from "use-react-router"
import clsx from "clsx"
import { useParams } from "react-router-dom"
import { ResUser, ResultResponse, Login } from "../../../../types"
import { logout } from "../../../../firebase/functions"
import useAlertState from "../../../../assets/hooks/useAlertState"
import { GlobalContext } from "../../../../assets/hooks/context/Global"

type Props = {
  user: ResUser
}

const MypageSidebar: FC<Props> = props => {
  const url: { id: string } = useParams()
  const { user } = props
  const { history } = useReactRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const { currentUser, setCurrentUser } = useContext(GlobalContext)
  const [isMyAccount, setIsMyAccount] = useState<boolean>(() => {
    return url.id === currentUser.id
  })
  const [
    isShowAlert,
    alertStatus,
    alertText,
    throwAlert,
    closeAlert
  ] = useAlertState(false)
  const location = useLocation()

  const handleLogout = async () => {
    if (window.confirm("ログアウトしますか？")) {
      const resLogout: ResultResponse<Login> = await logout()
      if (resLogout && resLogout.status === 200) {
        setCurrentUser(null)
        await throwAlert("success", "ログアウトしました。")
        history.replace(`/`)
      } else {
        await throwAlert("danger", "ログアウトが失敗しました。")
      }
    }
  }

  const isActive = (_tabType: string) => {
    if (location.pathname.indexOf(_tabType) !== -1) {
      return "active"
    }
  }

  useEffect(() => {
    setLoading(true)
  }, [])

  return (
    <>
      {loading && (
        <>
          <div className="_side-block">
            <Link
              to={`/mypage/${user.id ? user.id : url.id}/home`}
              className={clsx("_side-item", isActive("home"))}
            >
              ユーザー情報
            </Link>
            {isMyAccount ? (
              <Link
                to={`/mypage/${user.id ? user.id : url.id}/edit`}
                className={clsx("_side-item", isActive("edit"))}
              >
                会員情報を編集
              </Link>
            ) : (
              ""
            )}
            <Link
              to={`/mypage/${user.id ? user.id : url.id}/summaries`}
              className={clsx("_side-item", isActive("summaries"))}
            >
              投稿記事
            </Link>
            {isMyAccount ? (
              <Link
                to={`/mypage/${user.id ? user.id : url.id}/browsings`}
                className={clsx("_side-item", isActive("browsings"))}
              >
                閲覧履歴
              </Link>
            ) : (
              ""
            )}
            <Link
              to={`/mypage/${user.id ? user.id : url.id}/favorites`}
              className={clsx("_side-item", isActive("favorites"))}
            >
              いいね
            </Link>
            <Link
              to={`/mypage/${user.id ? user.id : url.id}/comments`}
              className={clsx("_side-item", isActive("comments"))}
            >
              コメント
            </Link>
            {isMyAccount ? (
              <div
                className={clsx("_side-item", isActive("logout"))}
                onClick={() => {
                  handleLogout()
                }}
              >
                ログアウト
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </>
  )
}

export default MypageSidebar

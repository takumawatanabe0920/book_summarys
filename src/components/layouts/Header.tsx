import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import useReactRouter from "use-react-router"
import { ResUser as CurrentUser, ResultResponse, Login } from "../../types"
import {
  getMyNotReadNotificationsCount,
  responseUploadImage,
  logout
} from "../../firebase/functions"
import {
  logoIcon,
  editIcon,
  userCircleIcon,
  bellIcon,
  caretDownIcon
} from "../../utils/icons"
import useAlertState from "./../../assets/hooks/useAlertState"
import { GlobalContext } from "./../../assets/hooks/context/Global"

const Header = () => {
  const [userIcon, setUserIcon] = useState<string>("")
  const [mouseOver, setMouseOver] = useState<boolean>(false)
  const { history } = useReactRouter()
  const [
    isShowAlert,
    alertStatus,
    alertText,
    throwAlert,
    closeAlert
  ] = useAlertState(false)
  const {
    currentUser,
    setCurrentUser,
    notificationCount,
    setNotificationCount
  } = useContext(GlobalContext)

  const enterPulldown = () => {
    setMouseOver(true)
  }

  const closePulldown = () => {
    setMouseOver(false)
  }

  const leavePulldown = () => {
    setTimeout(() => {
      setMouseOver(false)
    }, 300)
  }

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

  useEffect(() => {
    const loadData = async () => {
      try {
        const resNotificationCount: number = await getMyNotReadNotificationsCount(
          currentUser.id
        )
        const resUserIcon: string = await responseUploadImage(
          currentUser.photoURL
        )
        setUserIcon(resUserIcon)
        setNotificationCount(resNotificationCount)
      } catch (e) {}
    }

    loadData()
  }, [currentUser, notificationCount])

  return (
    <header className="l-header__container">
      <div className="l-header__top">
        <Link className="l-header__logo" to="/">
          <img src={logoIcon} alt="ロゴ" />
        </Link>
        <div className="l-header__right-box">
          {currentUser && (
            <Link to="/summary/create" className="l-header__sub-logo">
              <img src={editIcon} alt="ロゴ" />
            </Link>
          )}
          {currentUser && (
            <Link to="/notification" className="l-header__sub-logo">
              {notificationCount !== 0 && (
                <span className="notification_count">{notificationCount}</span>
              )}
              <img src={bellIcon} alt="ロゴ" />
            </Link>
          )}
          {currentUser && (
            <div
              className="l-header__sub-logo _userIcon"
              onMouseEnter={() => enterPulldown()}
            >
              <img
                src={userIcon ? userIcon : userCircleIcon}
                alt="ロゴ"
                className="_icon"
              />
              <img src={caretDownIcon} alt="logo" className="_logo" />
              {mouseOver && (
                <div
                  className="_pull-down"
                  onMouseEnter={() => enterPulldown()}
                  onMouseLeave={() => leavePulldown()}
                >
                  <Link to={`/mypage/${currentUser.id}/home`} className="_item">
                    ユーザー情報
                  </Link>
                  <Link
                    onClick={() => closePulldown()}
                    to={`/mypage/${currentUser.id}/edit`}
                    className="_item"
                  >
                    会員情報を編集
                  </Link>
                  <div className="hr"></div>
                  <Link
                    onClick={() => closePulldown()}
                    to={`/mypage/${currentUser.id}/summaries`}
                    className="_item"
                  >
                    投稿記事一覧
                  </Link>
                  <Link
                    onClick={() => closePulldown()}
                    to={`/mypage/${currentUser.id}/browsings`}
                    className="_item"
                  >
                    閲覧履歴一覧
                  </Link>
                  <Link
                    onClick={() => closePulldown()}
                    to={`/mypage/${currentUser.id}/favorites`}
                    className="_item"
                  >
                    いいね一覧
                  </Link>
                  <Link
                    onClick={() => closePulldown()}
                    to={`/mypage/${currentUser.id}/comments`}
                    className="_item"
                  >
                    コメント一覧
                  </Link>
                  <div className="hr"></div>
                  <div
                    className="_item"
                    onClick={() => {
                      handleLogout(), closePulldown()
                    }}
                  >
                    ログアウト
                  </div>
                </div>
              )}
            </div>
          )}
          {!currentUser && (
            <Link to="/sign_up" className="l-header__register-ttl">
              ユーザー登録
            </Link>
          )}
          {!currentUser && (
            <Link to="/sign_in" className="l-header__login-ttl">
              ログイン
            </Link>
          )}
          {/* <Navbar /> */}
        </div>
      </div>
    </header>
  )
}

export default Header

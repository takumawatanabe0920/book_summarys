import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { CurrentUser, ResultResponse, ResBrowsing } from "../../../types"
import { MypageSidebar, RegisterForm } from "../.."
import { getCurrentUser } from "../../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const MypageEdit = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
    }

    loadData()
  }, [])

  return (
    <>
      {loading && (
        <div className="mypage_main">
          <div className="md-container">
            <div className="main-block _block-center">
              <div className="user-mypage">
                <h1 className="main-title blue-main-title">MY PAGE</h1>
                <div className="mypage-content">
                  <MypageSidebar user={currentUser} />
                  <div className="_mypage-form">
                    <h2 className="sub-ttl">会員情報編集</h2>
                    <RegisterForm userData={currentUser} isEdit={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MypageEdit

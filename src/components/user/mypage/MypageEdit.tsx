import React, { useState, useEffect, useContext } from "react"
import useReactRouter from "use-react-router"
import { useParams } from "react-router-dom"
import { MypageSidebar, RegisterForm } from "../.."
import { GlobalContext } from "./../../../assets/hooks/context/Global"

const MypageEdit = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { history } = useReactRouter()
  const url: { id: string } = useParams()
  const { currentUser, setCurrentUser } = useContext(GlobalContext)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      if (url.id !== (currentUser && currentUser.id)) {
        history.push(`/mypage/${url.id}/home`)
      }
    }

    loadData()
  }, [])

  return (
    <>
      {loading && (
        <div className="mypage_main">
          <div className="l-container">
            <div className="main-block _block-center">
              <div className="user-mypage">
                <h1 className="main-title blue-main-title">MY PAGE</h1>
                <div className="mypage-content">
                  <MypageSidebar user={currentUser} />
                  <div className="_mypage">
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

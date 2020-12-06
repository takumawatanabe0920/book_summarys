import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { ResUser as CurrentUser } from "./../../types"

const UserDetailPage = () => {
  const [User, setUser] = useState<CurrentUser>()
  const url: { id: string } = useParams()

  return (
    <>
      <div className="c-register">
        <div className="md-container">
          <div className="user-mypage">
            <h1 className="main-title blue-main-title">MY PAGE</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetailPage

import React, { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "./../../assets/hooks/context/Global"

const UserDetailPage = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext)
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

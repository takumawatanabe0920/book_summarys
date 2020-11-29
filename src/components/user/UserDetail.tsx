import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { CurrentUser } from "./../../types"
import { getUser } from "../../firebase/functions"

const UserDetailPage = () => {
  const [User, setUser] = useState<CurrentUser>()
  const url: { id: string } = useParams()

  useEffect(() => {
    let unmounted = false
      //let user: CurrentUser = {}
    ;(async () => {
      // const res = await getUser(url.id)
      // if (res.status && res.status === 200) {
      //   const { displayName, photoURL, email, password } = res.data
      //   user = { displayName, photoURL, email, password }
      // }
      if (!unmounted) {
        // setUser(user)
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <>
      <div className="c-register">
        <div className="md-container">
          <div className="user-mypage">
            <h1 className="main-title blue-main-title">MY PAGE</h1>
            {/* <p>{User.displayName}</p>
            <p>{User.email}</p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetailPage

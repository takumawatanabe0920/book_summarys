import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { User } from "./../../types/user"
import functions from "../../utils/functions"
const { getUser } = functions

const UserDetailPage = () => {
  const [User, setUser] = useState<User>({})
  const url: { id: string } = useParams()

  useEffect(() => {
    let unmounted = false
    let user: User = {}
    ;(async () => {
      const res: any = await getUser(url.id)
      if (res.status && res.status === 200) {
        console.log(res.data)
        const { displayName, photoURL, email, password } = res.data
        user = { displayName, photoURL, email, password }
      }
      if (!unmounted) {
        setUser(user)
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
            <p>{User.displayName}</p>
            <p>{User.email}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetailPage

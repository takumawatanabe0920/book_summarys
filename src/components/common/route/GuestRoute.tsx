import React, { useState, useContext } from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { GlobalContext } from "../../../assets/hooks/context/Global"

const GuestRoute = (props: RouteProps) => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext)
  const [isAuth, setIsAuth] = useState(!!currentUser)

  return isAuth ? <Redirect to="/" /> : <Route {...props} />
}

export default GuestRoute

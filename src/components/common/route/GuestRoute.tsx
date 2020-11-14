import React, { useState, useEffect } from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { CurrentUser } from "../../../types"
import { getCurrentUser } from "../../../utils/functions"
const user: CurrentUser = getCurrentUser()

const GuestRoute = (props: RouteProps) => {
  const [isAuth, setIsAuth] = useState(!!user)

  return isAuth ? <Redirect to="/" /> : <Route {...props} />
}

export default GuestRoute

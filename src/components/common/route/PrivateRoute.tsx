import React, { useState } from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { CurrentUser } from "../../../types/user"
import functions from "../../../utils/functions"
const { getCurrentUser } = functions
const user: CurrentUser = getCurrentUser()

const PrivateRoute = (props: RouteProps) => {
  const [isAuth, setIsAuth] = useState(!!user)
  // 渡された props をそのまま Route に設定する
  return isAuth ? <Route {...props} /> : <Redirect to="/sign_in" />
}

export default PrivateRoute

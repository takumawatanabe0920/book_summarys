import React, { useState } from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { ResUser as CurrentUser } from "../../../types"
import { getCurrentUser } from "../../../firebase/functions"
const user: CurrentUser = getCurrentUser()

const PrivateRoute = (props: RouteProps) => {
  const [isAuth, setIsAuth] = useState(!!user)
  // 渡された props をそのまま Route に設定する
  return isAuth ? <Route {...props} /> : <Redirect to="/sign_in" />
}

export default PrivateRoute

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import functions from "../../../utils/functions";
var getCurrentUser = functions.getCurrentUser;
var user = getCurrentUser();
var PrivateRoute = function (props) {
    var _a = useState(!!user), isAuth = _a[0], setIsAuth = _a[1];
    // 渡された props をそのまま Route に設定する
    return isAuth ? React.createElement(Route, __assign({}, props)) : React.createElement(Redirect, { to: "/sign_in" });
};
export default PrivateRoute;
//# sourceMappingURL=PrivateRoute.js.map
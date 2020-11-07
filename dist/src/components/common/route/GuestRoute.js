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
var GuestRoute = function (props) {
    var _a = useState(!!user), isAuth = _a[0], setIsAuth = _a[1];
    return isAuth ? React.createElement(Redirect, { to: "/" }) : React.createElement(Route, __assign({}, props));
};
export default GuestRoute;
//# sourceMappingURL=GuestRoute.js.map
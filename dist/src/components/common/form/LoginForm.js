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
import Input from "./parts/Input";
import functions from "../../../utils/functions";
var login = functions.login;
var LoginForm = function () {
    var _a = useState({}), loginValues = _a[0], setLogin = _a[1];
    var handleInputChange = function (event) {
        var _a;
        event.persist();
        var target = event.target;
        var value = target.type === "checkbox" ? target.checked : target.value;
        var name = target.name;
        setLogin(__assign(__assign({}, loginValues), (_a = {}, _a[name] = value, _a)));
    };
    var onSubmit = function (event) {
        event.persist();
        event.preventDefault();
        var email = loginValues.email, password = loginValues.password;
        if (!email || !password) {
            console.log("パスワードとメールを入力してください");
            return;
        }
        if (window.confirm("ログインしますか？")) {
            login(email, password);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { className: "form-table" },
            React.createElement(Input, { title: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9", name: "email", placeholder: "example@gmail.com", required: true, onChange: handleInputChange }),
            React.createElement(Input, { title: "\u30D1\u30B9\u30EF\u30FC\u30C9", name: "password", type: "password", required: true, onChange: handleInputChange }),
            React.createElement("div", { className: "btn-area mgt-2 inline" },
                React.createElement("button", { className: "_btn submit", type: "submit", onClick: onSubmit }, "\u30ED\u30B0\u30A4\u30F3\u3059\u308B")))));
};
export default LoginForm;
//# sourceMappingURL=LoginForm.js.map
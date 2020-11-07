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
var register = functions.register;
var RegisterForm = function () {
    var _a = useState({}), values = _a[0], setValues = _a[1];
    var handleInputChange = function (event) {
        var _a;
        event.persist();
        var target = event.target;
        var value = target.type === "checkbox" ? target.checked : target.value;
        var name = target.name;
        setValues(__assign(__assign({}, values), (_a = {}, _a[name] = value, _a)));
    };
    var onSubmit = function (event) {
        event.persist();
        event.preventDefault();
        var displayName = values.displayName, email = values.email, password = values.password, photoURL = values.photoURL;
        if (!displayName || !email || !password) {
            console.log("名前とパスワードとメールを入力してください");
            return;
        }
        if (window.confirm("会員登録しますか？")) {
            register(email, password, displayName, photoURL);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { className: "form-table" },
            React.createElement(Input, { title: "\u540D\u524D", name: "displayName", placeholder: "\u8981\u7D04\u592A\u90CE", required: true, onChange: handleInputChange }),
            React.createElement(Input, { title: "\u30E6\u30FC\u30B6\u30FC\u30A2\u30A4\u30B3\u30F3", name: "photoURL", onChange: handleInputChange }),
            React.createElement(Input, { title: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9", name: "email", placeholder: "example@gmail.com", required: true, onChange: handleInputChange }),
            React.createElement(Input, { title: "\u30D1\u30B9\u30EF\u30FC\u30C9", name: "password", type: "password", required: true, onChange: handleInputChange }),
            React.createElement("div", { className: "btn-area mgt-2 inline" },
                React.createElement("button", { className: "_btn submit", type: "submit", onClick: onSubmit }, "\u767B\u9332\u3059\u308B")))));
};
export default RegisterForm;
//# sourceMappingURL=RegisterForm.js.map
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../common/form/LoginForm";
var SignInPage = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "c-register" },
            React.createElement("div", { className: "md-container" },
                React.createElement("h1", { className: "main-title blue-main-title" }, "\u30ED\u30B0\u30A4\u30F3"),
                React.createElement(LoginForm, null),
                React.createElement(Link, { to: "/sign_up" }, "\u4F1A\u54E1\u767B\u9332")))));
};
export default SignInPage;
//# sourceMappingURL=index.js.map
import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../common/form/RegisterForm";
var SignUpPage = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "c-register" },
            React.createElement("div", { className: "md-container" },
                React.createElement("h1", { className: "main-title blue-main-title" }, "\u4F1A\u54E1\u767B\u9332"),
                React.createElement(RegisterForm, null),
                React.createElement(Link, { to: "sign_in" }, "\u30ED\u30B0\u30A4\u30F3")))));
};
export default SignUpPage;
//# sourceMappingURL=index.js.map
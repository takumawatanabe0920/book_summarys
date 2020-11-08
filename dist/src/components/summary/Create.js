import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import SummaryForm from "../common/form/SummaryForm";
var SummaryCreatePage = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "summary_main" },
            React.createElement("div", { className: "main-block" },
                React.createElement(SummaryForm, null),
                React.createElement(Link, { to: "/" }, "\u4E00\u89A7\u3078\u623B\u308B")),
            React.createElement(Sidebar, null))));
};
export default SummaryCreatePage;
//# sourceMappingURL=Create.js.map
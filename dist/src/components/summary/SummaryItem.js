import React from "react";
import { Link } from "react-router-dom";
import articleImg from "../../static/images/izumi-img.jpg";
import FavoliteButton from "./../common/parts/FavoliteButton";
var SummaryItem = function (props) {
    var data = props.data;
    return (React.createElement(React.Fragment, null,
        React.createElement(Link, { to: "/summary/" + data.id, className: "data-item" },
            React.createElement("div", { className: "_thumnail" },
                React.createElement("img", { src: articleImg })),
            React.createElement("div", { className: "_txt-box" },
                React.createElement("h3", { className: "_summary-ttl" }, data.title),
                React.createElement("p", { className: "_summary-txt" }, data.author),
                React.createElement(FavoliteButton, { user_id: data.user_id, summary_id: data.id })))));
};
export default SummaryItem;
//# sourceMappingURL=SummaryItem.js.map
import React from "react";
import SummaryItem from "./SummaryItem";
var SummaryList = function (props) {
    var dataList = props.dataList;
    //console.log(dataList)
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "data-list" }, dataList.map(function (data) {
            return React.createElement(SummaryItem, { key: data.id, data: data });
        }))));
};
export default SummaryList;
//# sourceMappingURL=SummaryList.js.map
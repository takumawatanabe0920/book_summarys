import React from "react";
var Select = function (props) {
    var title = props.title, required = props.required, value = props.value, name = props.name, onChange = props.onChange, dataList = props.dataList;
    // dataList &&
    //   dataList.forEach(data => {
    //     console.log(data)
    //   })
    return (React.createElement(React.Fragment, null,
        React.createElement("dl", { className: "form-group" },
            React.createElement("dt", null,
                React.createElement("label", null,
                    title,
                    required && React.createElement("span", { className: "req" }, "\u5FC5\u9808"))),
            React.createElement("dd", null,
                React.createElement("select", { value: value, name: name, onChange: onChange }, dataList &&
                    dataList.map(function (data) {
                        return (React.createElement("option", { value: data.id, key: data.id }, data.name));
                    }))))));
};
Select.defaultProps = {
    required: false
};
export default Select;
//# sourceMappingURL=Select.js.map
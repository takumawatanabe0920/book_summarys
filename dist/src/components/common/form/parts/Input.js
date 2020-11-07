import React from "react";
var Input = function (props) {
    var title = props.title, required = props.required, type = props.type, value = props.value, placeholder = props.placeholder, name = props.name, onChange = props.onChange;
    return (React.createElement(React.Fragment, null,
        React.createElement("dl", { className: "form-group" },
            React.createElement("dt", null,
                React.createElement("label", null,
                    title,
                    required && React.createElement("span", { className: "req" }, "\u5FC5\u9808"))),
            React.createElement("dd", null,
                React.createElement("input", { value: value, name: name, type: type, className: "form-control", placeholder: placeholder, onChange: onChange })))));
};
Input.defaultProps = {
    type: "text",
    required: false
};
export default Input;
//# sourceMappingURL=Input.js.map
import React from "react";
var Textarea = function (props) {
    var title = props.title, required = props.required, value = props.value, placeholder = props.placeholder, name = props.name, onChange = props.onChange;
    return (React.createElement(React.Fragment, null,
        React.createElement("dl", { className: "form-group" },
            React.createElement("dt", null,
                React.createElement("label", null,
                    title,
                    required && React.createElement("span", { className: "req" }, "\u5FC5\u9808"))),
            React.createElement("dd", null,
                React.createElement("textarea", { value: value, name: name, className: "form-control", placeholder: placeholder, onChange: onChange })))));
};
Textarea.defaultProps = {
    required: false
};
export default Textarea;
//# sourceMappingURL=Textarea.js.map
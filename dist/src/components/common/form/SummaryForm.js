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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./parts/Input";
import Textarea from "./parts/Textarea";
import Select from "./parts/Select";
import functions from "../../../utils/functions";
var getCategories = functions.getCategories, categoryLinkingSubCategory = functions.categoryLinkingSubCategory, createSummary = functions.createSummary, getCurrentUser = functions.getCurrentUser;
var user = getCurrentUser();
var SummaryForm = function () {
    var _a = useState({}), values = _a[0], setValues = _a[1];
    var _b = useState([]), categories = _b[0], setCategories = _b[1];
    var _c = useState([]), subCategories = _c[0], setSubCategories = _c[1];
    var _d = useState(false), isSelectCategory = _d[0], setIsSelectCategory = _d[1];
    var _e = useForm({
        mode: "onChange"
    }), register = _e.register, handleSubmit = _e.handleSubmit, errors = _e.errors, formState = _e.formState;
    var handleInputChange = function (event) {
        var _a;
        event.persist();
        var target = event.target;
        var value = target.type === "checkbox" ? target.checked : target.value;
        var name = target.name;
        setValues(__assign(__assign({}, values), (_a = {}, _a[name] = value, _a)));
    };
    var handleTextareaChange = function (event) {
        var _a;
        event.persist();
        var target = event.target;
        var value = target.value;
        var name = target.name;
        setValues(__assign(__assign({}, values), (_a = {}, _a[name] = value, _a)));
    };
    var handleSelectChange = function (event) {
        var _a;
        event.persist();
        var target = event.target;
        var value = target.value;
        var name = target.name;
        setValues(__assign(__assign({}, values), (_a = {}, _a[name] = value, _a)));
        setIsSelectCategory(true);
        subCategorySelect(value);
    };
    var onSubmit = function (event) {
        console.log(values);
        event.persist();
        event.preventDefault();
        if (window.confirm("記事を作成しますか？")) {
            createSummary(values);
        }
    };
    var subCategorySelect = function (categoryId) { return __awaiter(void 0, void 0, void 0, function () {
        var subCate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, categoryLinkingSubCategory(categoryId)];
                case 1:
                    subCate = _a.sent();
                    setSubCategories(subCate);
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        var unmounted = false;
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var cate_result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getCategories()];
                    case 1:
                        cate_result = _b.sent();
                        if (!unmounted) {
                            console.log("called-first");
                            setCategories(cate_result);
                            setValues(__assign(__assign({}, values), (_a = {}, _a["user_id"] = user.uid, _a)));
                        }
                        return [2 /*return*/];
                }
            });
        }); })();
        return function () {
            unmounted = true;
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { className: "form-table" },
            React.createElement(Input, { title: "\u672C\u306E\u30BF\u30A4\u30C8\u30EB", name: "title", placeholder: "\u4EBA\u3092\u52D5\u304B\u3059", required: true, onChange: handleInputChange }),
            errors.title && "作者名は1文字以上、20文字以下でなければなりません。",
            React.createElement(Textarea, { title: "\u672C\u306E\u5185\u5BB9", name: "content", required: true, onChange: handleTextareaChange }),
            React.createElement(Select, { title: "\u672C\u306E\u30AB\u30C6\u30B4\u30EA\u30FC", name: "category", required: true, dataList: categories, onChange: handleSelectChange }),
            isSelectCategory && (React.createElement(Select, { title: "\u672C\u306E\u30B5\u30D6\u30AB\u30C6\u30B4\u30EA\u30FC", name: "sub_category", onChange: handleSelectChange, dataList: subCategories })),
            React.createElement(Input, { title: "\u7B46\u8005", name: "author", placeholder: "\u8981\u7D04\u592A\u90CE", onChange: handleInputChange }),
            React.createElement(Input, { title: "\u5024\u6BB5", name: "price", placeholder: "4000\u5186", onChange: handleInputChange }),
            React.createElement(Input, { title: "\u8A55\u4FA1(5\u6BB5\u968E)", name: "review", placeholder: "\u661F\uFF14", onChange: handleInputChange }),
            React.createElement(Input, { title: "\u5546\u54C1\u30EA\u30F3\u30AF", name: "product_links", placeholder: "https://~", onChange: handleInputChange }),
            React.createElement("div", { className: "btn-area mgt-2 inline" },
                React.createElement("button", { className: "_btn submit", type: "submit", onClick: onSubmit }, "\u4F5C\u6210\u3059\u308B"),
                React.createElement("button", { className: "_btn remove", type: "button" }, "\u524A\u9664\u3059\u308B")))));
};
export default SummaryForm;
//# sourceMappingURL=SummaryForm.js.map
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
import { useParams } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import functions from "../../utils/functions";
var getSummaryBook = functions.getSummaryBook, getCategory = functions.getCategory, getSubCategory = functions.getSubCategory, getUser = functions.getUser;
var SummaryShowPage = function () {
    var _a = useState({}), summarybook = _a[0], setSummaryBook = _a[1];
    var _b = useState({}), category = _b[0], setCategory = _b[1];
    var _c = useState({}), subCategory = _c[0], setSubCategory = _c[1];
    var url = useParams();
    useEffect(function () {
        var unmounted = false;
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var resSummaryBook, resCategory, resSubCategory, resUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getSummaryBook(url.id)];
                    case 1:
                        resSummaryBook = _a.sent();
                        return [4 /*yield*/, getCategory(resSummaryBook.category)];
                    case 2:
                        resCategory = _a.sent();
                        resSubCategory = "";
                        if (!resSummaryBook.sub_category) return [3 /*break*/, 4];
                        return [4 /*yield*/, getSubCategory(resSummaryBook.sub_category)];
                    case 3:
                        resSubCategory = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, getUser(resSummaryBook.user_id)];
                    case 5:
                        resUser = _a.sent();
                        if (!unmounted) {
                            setSummaryBook(resSummaryBook);
                            setCategory(resCategory);
                            setSubCategory(resSubCategory);
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
        React.createElement("div", { className: "summary_main" },
            React.createElement("div", { className: "main-block" },
                React.createElement("div", { className: "prof-area" },
                    React.createElement("div", { className: "_icon" },
                        React.createElement("img", { src: "", alt: "" })),
                    React.createElement("div", { className: "_icon" }, "\u6E21\u8FBA\u62D3\u99AC")),
                React.createElement("div", { className: "summary-show" },
                    React.createElement("div", { className: "_header" },
                        React.createElement("h1", { className: "main-title blue-main-title" }, summarybook.title),
                        React.createElement("div", { className: "tags" },
                            React.createElement("span", { className: "tag" }, category.name),
                            React.createElement("span", { className: "tag" }, subCategory ? subCategory.name : ""))),
                    React.createElement("div", { className: "_body" },
                        React.createElement("p", { className: "_txt" }, summarybook.content)),
                    React.createElement("div", { className: "_footer" },
                        React.createElement("dl", null,
                            React.createElement("dt", null, "\u5024\u6BB5\uFF1A"),
                            React.createElement("dd", null,
                                summarybook.price,
                                "\u5186")),
                        React.createElement("dl", null,
                            React.createElement("dt", null, "\u8457\u8005\uFF1A"),
                            React.createElement("dd", null, summarybook.author)),
                        React.createElement("dl", null,
                            React.createElement("dt", null, "\u5546\u54C1\u30EA\u30F3\u30AF\uFF1A"),
                            React.createElement("dd", null, summarybook.product_links))))),
            React.createElement(Sidebar, null))));
};
export default SummaryShowPage;
//# sourceMappingURL=Show.js.map
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
// components
import Sidebar from "./layouts/Sidebar";
import SummaryList from "./summary/SummaryList";
import functions from "../utils/functions";
var getSummaries = functions.getSummaries;
// sections
var IndexPage = function () {
    var _a = useState([]), summaries = _a[0], setSummaries = _a[1];
    useEffect(function () {
        var unmounted = false;
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var summaries;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getSummaries()];
                    case 1:
                        summaries = _a.sent();
                        if (!unmounted) {
                            setSummaries(summaries);
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
        React.createElement("div", { className: "l-main" },
            React.createElement("div", { className: "main-block" },
                React.createElement("h2", { className: "main-title blue-main-title" }, "\u65B0\u7740\u8981\u7D04\u8A18\u4E8B"),
                React.createElement(SummaryList, { dataList: summaries }),
                React.createElement("h2", { className: "main-title blue-main-title" }, "\u95A2\u9023\u8981\u7D04\u8A18\u4E8B"),
                React.createElement(SummaryList, { dataList: summaries })),
            React.createElement(Sidebar, null))));
};
export default IndexPage;
//# sourceMappingURL=App.js.map
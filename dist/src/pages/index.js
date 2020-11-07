import React from "react";
import ReactDOM from "react-dom";
import "../assets/stylesheets/main.scss";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "../components/common/route/PrivateRoute";
import GuestRoute from "../components/common/route/GuestRoute";
// コンポーネント読み込み
import IndexPage from "../components/App";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import SummaryCreatePage from "../components/summary/Create";
import SummaryShowPage from "../components/summary/Show";
import SignUpPage from "../components/sign_up";
import SignInPage from "../components/sign_in";
import MypagePage from "../components/mypage";
ReactDOM.render(React.createElement("div", null,
    React.createElement(Router, null,
        React.createElement(Header, null),
        React.createElement("div", { className: "wrapper" },
            React.createElement("div", { className: "main-contents" },
                React.createElement("div", { className: "l-container" },
                    React.createElement(Switch, null,
                        React.createElement(Route, { exact: true, path: "/", component: IndexPage }),
                        React.createElement(PrivateRoute, { exact: true, path: "/summary/create", component: SummaryCreatePage }),
                        React.createElement(PrivateRoute, { exact: true, path: "/mypage", component: MypagePage }),
                        React.createElement(Route, { exact: true, path: "/summary/:id", component: SummaryShowPage }),
                        React.createElement(GuestRoute, { exact: true, path: "/sign_up", component: SignUpPage }),
                        React.createElement(GuestRoute, { exact: true, path: "/sign_in", component: SignInPage }))))),
        React.createElement("div", { className: "extendedFooter" },
            React.createElement(Footer, null)))), document.getElementById("root"));
//# sourceMappingURL=index.js.map
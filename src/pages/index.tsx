import React from "react"
import ReactDOM from "react-dom"
import "../assets/stylesheets/main.scss"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import PrivateRoute from "../components/common/route/PrivateRoute"
import GuestRoute from "../components/common/route/GuestRoute"
// コンポーネント読み込み
import IndexPage from "../components/App"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import SummaryCreatePage from "../components/summary/Create"
import SummaryShowPage from "../components/summary/Show"
import SignUpPage from "../components/sign_up"
import SignInPage from "../components/sign_in"
import MypagePage from "../components/user/Mypage"
import UserDetailPage from "../components/user/UserDetail"

ReactDOM.render(
  <div>
    <Router>
      <Header />
      <div className="wrapper">
        <div className="main-contents">
          <div className="l-container">
            <Switch>
              <Route exact path="/" component={IndexPage} />
              <PrivateRoute
                exact
                path="/summary/create"
                component={SummaryCreatePage}
              />
              <PrivateRoute exact path="/mypage" component={MypagePage} />
              <Route exact path="/user/:id" component={UserDetailPage} />
              <Route exact path="/summary/:id" component={SummaryShowPage} />
              <GuestRoute exact path="/sign_up" component={SignUpPage} />
              <GuestRoute exact path="/sign_in" component={SignInPage} />
            </Switch>
          </div>
        </div>
      </div>
      <div className="extendedFooter">
        <Footer />
      </div>
    </Router>
  </div>,
  document.getElementById("root")
)

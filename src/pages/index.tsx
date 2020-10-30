import React from "react"
import ReactDOM from "react-dom"
import "../assets/stylesheets/main.scss"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
// コンポーネント読み込み
import IndexPage from "../components/App"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import SummaryCreatePage from "../components/summary/Create"
import SummaryShowPage from "../components/summary/Show"
import SignUpPage from "../components/sign_up"
import SignInPage from "../components/sign_in"
import MypagePage from "../components/mypage"

ReactDOM.render(
  <div>
    <Router>
      <Header />
      <div className="wrapper">
        <div className="main-contents">
          <div className="l-container">
            <Switch>
              <Route exact path="/" component={IndexPage} />
              <Route
                exact
                path="/summary/create"
                component={SummaryCreatePage}
              />
              <Route exact path="/summary/:id" component={SummaryShowPage} />
              <Route exact path="/sign_up" component={SignUpPage} />
              <Route exact path="/sign_in" component={SignInPage} />
              <Route exact path="/mypage" component={MypagePage} />
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

import React from "react"
import ReactDOM from "react-dom"
import "../assets/stylesheets/main.scss"
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom"
// コンポーネント読み込み
import IndexPage from "../components/App"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import CreatePage from "../components/summary/Create"
import ShowPage from "../components/summary/Show"
import SignUpPage from "../components/sign_up"

ReactDOM.render(
  <div>
    <Router>
      <Header />
      <div className="wrapper">
        <div className="main-contents">
          <div className="l-container">
            <Switch>
              <Route exact path="/" component={IndexPage} />
              <Route exact path="/summary/create" component={CreatePage} />
              <Route exact path="/summary/:id" component={ShowPage} />
              <Route exact path="/sign_up" component={SignUpPage} />
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

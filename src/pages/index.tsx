import React from "react"
import ReactDOM from "react-dom"
import "../assets/stylesheets/main.scss"
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom"
// コンポーネント読み込み
import IndexPage from "../components/App"
import CreatePage from "../components/summary/Create"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"

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

import React from "react"
import ReactDOM from "react-dom"
import "../assets/stylesheets/main.scss"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import {
  PrivateRoute,
  HomePage,
  Header,
  Footer,
  SummaryCreatePage,
  GuestRoute,
  SummaryShowPage,
  SignUpPage,
  SignInPage,
  MypagePage,
  UserDetailPage,
  NotificationPage
} from "../components"
// コンポーネント読み込み

ReactDOM.render(
  <div>
    <Router>
      <Header />
      <div className="wrapper">
        <div className="main-contents">
          <div className="l-container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <PrivateRoute
                exact
                path="/summary/create"
                component={SummaryCreatePage}
              />
              <PrivateRoute exact path="/mypage" component={MypagePage} />
              <Route exact path="/user/:id" component={UserDetailPage} />
              <Route exact path="/summary/:id" component={SummaryShowPage} />
              <Route exact path="/notification" component={NotificationPage} />
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

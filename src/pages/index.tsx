import React from "react"
import ReactDOM from "react-dom"
import { GlobalProvider } from "../assets/hooks/context/Global"
import "../assets/stylesheets/main.scss"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import {
  PrivateRoute,
  HomePage,
  Header,
  Footer,
  SummaryCreatePage,
  SummaryEditPage,
  GuestRoute,
  SummaryShowPage,
  SignUpPage,
  SignInPage,
  MypageFavorites,
  MypageSummaries,
  MypageBrowsings,
  MypageComments,
  MypageHome,
  MypageEdit,
  UserDetailPage,
  NotificationPage,
  SummaryPage,
  TopHeader,
  Alert
} from "../components"
// コンポーネント読み込み

ReactDOM.render(
  <div>
    <GlobalProvider>
      <Router>
        <TopHeader />
        <Header />
        <div className="wrapper pt0">
          <div className="main-contents">
            <div className="lg-container">
              <Alert />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <PrivateRoute
                  exact
                  path="/summary/create"
                  component={SummaryCreatePage}
                />
                <PrivateRoute
                  exact
                  path="/summary/:id/edit"
                  component={SummaryEditPage}
                />
                <Route exact path="/mypage/:id/home" component={MypageHome} />
                <PrivateRoute
                  exact
                  path="/mypage/:id/edit"
                  component={MypageEdit}
                />
                <Route
                  exact
                  path="/mypage/:id/favorites"
                  component={MypageFavorites}
                />
                <Route
                  exact
                  path="/mypage/:id/browsings"
                  component={MypageBrowsings}
                />
                <Route
                  exact
                  path="/mypage/:id/comments"
                  component={MypageComments}
                />
                <Route
                  exact
                  path="/mypage/:id/summaries"
                  component={MypageSummaries}
                />
                <Route exact path="/user/:id" component={UserDetailPage} />
                <Route exact path="/summary/:id" component={SummaryShowPage} />
                <Route exact path="/summary" component={SummaryPage} />
                <PrivateRoute
                  exact
                  path="/notification"
                  component={NotificationPage}
                />
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
    </GlobalProvider>
  </div>,
  document.getElementById("root")
)

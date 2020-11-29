import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "../assets/hooks/context/Global"
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
  MypageFavorites,
  MypageSummaries,
  MypageBrowsings,
  MypageComments,
  MypageEdit,
  UserDetailPage,
  NotificationPage,
  SummaryPage,
  TopHeader
} from "../components"
// コンポーネント読み込み

ReactDOM.render(
  <div>
    <Provider>
      <Router>
        <TopHeader />
        <Header />
        <div className="wrapper pt0">
          <div className="main-contents">
            <div className="lg-container">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <PrivateRoute
                  exact
                  path="/summary/create"
                  component={SummaryCreatePage}
                />
                <PrivateRoute exact path="/mypage/:id" component={MypagePage} />
                <PrivateRoute
                  exact
                  path="/mypage/:id/edit"
                  component={MypageEdit}
                />
                <PrivateRoute
                  exact
                  path="/mypage/:id/favorites"
                  component={MypageFavorites}
                />
                <PrivateRoute
                  exact
                  path="/mypage/:id/browsings"
                  component={MypageBrowsings}
                />
                <PrivateRoute
                  exact
                  path="/mypage/:id/comments"
                  component={MypageComments}
                />
                <PrivateRoute
                  exact
                  path="/mypage/:id/summaries"
                  component={MypageSummaries}
                />
                <Route exact path="/user/:id" component={UserDetailPage} />
                <Route exact path="/summary/:id" component={SummaryShowPage} />
                <Route exact path="/summary" component={SummaryPage} />
                <Route
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
    </Provider>
  </div>,
  document.getElementById("root")
)

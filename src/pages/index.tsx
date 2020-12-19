import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import { GlobalProvider } from "../assets/hooks/context/Global"
import "../assets/stylesheets/main.scss"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import {
  PrivateRoute,
  GuestRoute,
  Header,
  Footer,
  TopHeader,
  Alert,
  Loading
} from "../components"
const HomePage = lazy(() => import("../components/App"))
const SummaryCreatePage = lazy(() => import("../components/summary/Create"))
const SummaryEditPage = lazy(() => import("../components/summary/Edit"))
const SummaryShowPage = lazy(() => import("../components/summary/Show"))
const SignUpPage = lazy(() => import("../components/sign_up"))
const SignInPage = lazy(() => import("../components/sign_in"))
const MypageFavorites = lazy(() =>
  import("../components/user/mypage/MypageFavorites")
)
const MypageSummaries = lazy(() =>
  import("../components/user/mypage/MypageSummaries")
)
const MypageBrowsings = lazy(() =>
  import("../components/user/mypage/MypageBrowsings")
)
const MypageComments = lazy(() =>
  import("../components/user/mypage/MypageComments")
)
const MypageHome = lazy(() => import("../components/user/mypage/MypageHome"))
const MypageEdit = lazy(() => import("../components/user/mypage/MypageEdit"))
const UserDetailPage = lazy(() => import("../components/user/UserDetail"))
const NotificationPage = lazy(() => import("../components/notifications"))
const SummaryPage = lazy(() => import("../components/summary"))

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
                <Route exact path="/">
                  <Suspense fallback={<div />}>
                    <HomePage />
                  </Suspense>
                </Route>
                <PrivateRoute exact path="/summary/create">
                  <Suspense fallback={<div />}>
                    <SummaryCreatePage />
                  </Suspense>
                </PrivateRoute>
                <PrivateRoute exact path="/summary/:id/edit">
                  <Suspense fallback={<div />}>
                    <SummaryEditPage />
                  </Suspense>
                </PrivateRoute>
                <Route exact path="/mypage/:id/home">
                  <Suspense fallback={<div />}>
                    <MypageHome />
                  </Suspense>
                </Route>
                <PrivateRoute exact path="/mypage/:id/edit">
                  <Suspense fallback={<div />}>
                    <MypageEdit />
                  </Suspense>
                </PrivateRoute>
                <Route exact path="/mypage/:id/favorites">
                  <Suspense fallback={<div />}>
                    <MypageFavorites />
                  </Suspense>
                </Route>
                <Route exact path="/mypage/:id/browsings">
                  <Suspense fallback={<div />}>
                    <MypageBrowsings />
                  </Suspense>
                </Route>
                <Route exact path="/mypage/:id/comments">
                  <Suspense fallback={<div />}>
                    <MypageComments />
                  </Suspense>
                </Route>
                <Route exact path="/mypage/:id/summaries">
                  <Suspense fallback={<div />}>
                    <MypageSummaries />
                  </Suspense>
                </Route>
                <Route exact path="/user/:id">
                  <Suspense fallback={<div />}>
                    <UserDetailPage />
                  </Suspense>
                </Route>
                <Route exact path="/summary/:id">
                  <Suspense fallback={<div />}>
                    <SummaryShowPage />
                  </Suspense>
                </Route>
                <Route exact path="/summary">
                  <Suspense fallback={<div />}>
                    <SummaryPage />
                  </Suspense>
                </Route>
                <PrivateRoute exact path="/notification">
                  <Suspense fallback={<div />}>
                    <NotificationPage />
                  </Suspense>
                </PrivateRoute>
                <GuestRoute exact path="/sign_up">
                  <Suspense fallback={<div />}>
                    <SignUpPage />
                  </Suspense>
                </GuestRoute>
                <GuestRoute exact path="/sign_in">
                  <Suspense fallback={<div />}>
                    <SignInPage />
                  </Suspense>
                </GuestRoute>
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

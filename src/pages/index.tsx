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
  Alert
} from "../components"
const HomePage = React.lazy(() => import("../components/App"))
const SummaryCreatePage = React.lazy(() =>
  import("../components/summary/Create")
)
const SummaryEditPage = React.lazy(() => import("../components/summary/Edit"))
const SummaryShowPage = React.lazy(() => import("../components/summary/Show"))
const SignUpPage = React.lazy(() => import("../components/sign_up"))
const SignInPage = React.lazy(() => import("../components/sign_in"))
const MypageFavorites = React.lazy(() =>
  import("../components/user/mypage/MypageFavorites")
)
const MypageSummaries = React.lazy(() =>
  import("../components/user/mypage/MypageSummaries")
)
const MypageBrowsings = React.lazy(() =>
  import("../components/user/mypage/MypageBrowsings")
)
const MypageComments = React.lazy(() =>
  import("../components/user/mypage/MypageComments")
)
const MypageHome = React.lazy(() =>
  import("../components/user/mypage/MypageHome")
)
const MypageEdit = React.lazy(() =>
  import("../components/user/mypage/MypageEdit")
)
const UserDetailPage = React.lazy(() => import("../components/user/UserDetail"))
const NotificationPage = React.lazy(() => import("../components/notifications"))
const SummaryPage = React.lazy(() => import("../components/summary"))

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
                  <Suspense fallback={<div>Loading...</div>}>
                    <HomePage />
                  </Suspense>
                </Route>
                <PrivateRoute exact path="/summary/create">
                  <Suspense fallback={<div>Loading...</div>}>
                    <SummaryCreatePage />
                  </Suspense>
                </PrivateRoute>
                <PrivateRoute exact path="/summary/:id/edit">
                  <Suspense fallback={<div>Loading...</div>}>
                    <SummaryEditPage />
                  </Suspense>
                </PrivateRoute>
                <Route exact path="/mypage/:id/home">
                  <Suspense fallback={<div>Loading...</div>}>
                    <MypageHome />
                  </Suspense>
                </Route>
                <PrivateRoute exact path="/mypage/:id/edit">
                  <Suspense fallback={<div>Loading...</div>}>
                    <MypageEdit />
                  </Suspense>
                </PrivateRoute>
                <Route exact path="/mypage/:id/favorites">
                  <Suspense fallback={<div>Loading...</div>}>
                    <MypageFavorites />
                  </Suspense>
                </Route>
                <Route exact path="/mypage/:id/browsings">
                  <Suspense fallback={<div>Loading...</div>}>
                    <MypageBrowsings />
                  </Suspense>
                </Route>
                <Route exact path="/mypage/:id/comments">
                  <Suspense fallback={<div>Loading...</div>}>
                    <MypageComments />
                  </Suspense>
                </Route>
                <Route exact path="/mypage/:id/summaries">
                  <Suspense fallback={<div>Loading...</div>}>
                    <MypageSummaries />
                  </Suspense>
                </Route>
                <Route exact path="/user/:id">
                  <Suspense fallback={<div>Loading...</div>}>
                    <UserDetailPage />
                  </Suspense>
                </Route>
                <Route exact path="/summary/:id">
                  <Suspense fallback={<div>Loading...</div>}>
                    <SummaryShowPage />
                  </Suspense>
                </Route>
                <Route exact path="/summary">
                  <Suspense fallback={<div>Loading...</div>}>
                    <SummaryPage />
                  </Suspense>
                </Route>
                <PrivateRoute exact path="/notification">
                  <Suspense fallback={<div>Loading...</div>}>
                    <NotificationPage />
                  </Suspense>
                </PrivateRoute>
                <GuestRoute exact path="/sign_up">
                  <Suspense fallback={<div>Loading...</div>}>
                    <SignUpPage />
                  </Suspense>
                </GuestRoute>
                <GuestRoute exact path="/sign_in">
                  <Suspense fallback={<div>Loading...</div>}>
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

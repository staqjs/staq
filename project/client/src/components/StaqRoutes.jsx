import React, { useEffect, useState } from 'react'
import { Redirect, Route, useLocation, useHistory } from 'react-router-dom'

import { withAuth, SignInPage, SignUpPage } from './Session'
import LandingPage from './LandingPage/LandingPage'
import Footer from './Footer/Footer'
import NavBar from './Navigation/NavBar'
import UserSettingsPage from './Settings/UserSettingsPage'
import BillingSettingsPage from './Settings/BillingSettingsPage'
import * as ROUTES from '../constants/routes'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function PrivateRouteBase({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.currentUser ? (
          <Component auth={auth} {...props} />
        ) : (
          <Redirect to='/signin' />
        )
      }
    />
  )
}

const footerRoutes = ['/', '/demo', '/signin', '/signup']

function StaqRoutes() {
  const history = useHistory()
  const [pathname, setPathname] = useState(history.location.pathname)

  useEffect(() => {
    setPathname(history.location.pathname)
  }, [history.location.pathname])

  return (
    <React.Fragment>
      <ScrollToTop />
      <NavBar />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />

      <PrivateRoute path={ROUTES.USER_SETTINGS} component={UserSettingsPage} />
      <PrivateRoute
        path={ROUTES.BILLING_SETTINGS}
        component={BillingSettingsPage}
      />

      {footerRoutes.includes(pathname) ? <Footer /> : null}
    </React.Fragment>
  )
}

const PrivateRoute = withAuth(PrivateRouteBase)

export default StaqRoutes
export { PrivateRoute }

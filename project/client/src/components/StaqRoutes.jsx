import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { withAuth, SignInPage, SignUpPage } from './Session'
import LandingPage from './LandingPage'
import NavBar from './Navigation/NavBar'
import UserSettingsPage from './Settings/UserSettingsPage'
import BillingSettingsPage from './Settings/BillingSettingsPage'
import * as ROUTES from '../constants/routes'

function PrivateRouteBase({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        auth.currentUser
          ? <Component auth={auth} {...props} />
          : <Redirect to="/signin" />
      )}
    />
  )
}

function StaqRoutes(props) {
  const { auth } = props

  return (
    <React.Fragment>
      <NavBar />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />

      <PrivateRoute path={ROUTES.USER_SETTINGS} component={UserSettingsPage} />
      <PrivateRoute path={ROUTES.BILLING_SETTINGS} component={BillingSettingsPage} />
    </React.Fragment>
  )
}

const PrivateRoute = withAuth(PrivateRouteBase)

export default StaqRoutes
export {
  PrivateRoute
}

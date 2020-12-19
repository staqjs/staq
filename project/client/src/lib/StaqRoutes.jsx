import React, { useEffect, useState } from 'react'
import { Redirect, Route, useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'

import staqConfig from '../../../staq'

import LandingPage from '../pages/LandingPage/LandingPage'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/Navigation/NavBar'
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

const footerRoutes = ['/', '/demo', '/signin', '/signup', '/forgot-password']

function StaqRoutes() {
  const history = useHistory()
  const [pathname, setPathname] = useState(history.location.pathname)
  const navbarRoutes = staqConfig.get('navbarRoutes')

  history.listen((location) => {
    setPathname(location.pathname)
  })

  return (
    <React.Fragment>
      <ScrollToTop />

      {
        _.isNil(navbarRoutes)
          ? <NavBar />
          : navbarRoutes.includes(pathname) ? <NavBar /> : null
      }

      <Route exact path={ROUTES.LANDING} component={LandingPage} />


      {footerRoutes.includes(pathname) ? <Footer /> : null}
    </React.Fragment>
  )
}

const PrivateRoute = PrivateRouteBase

export default StaqRoutes
export { PrivateRoute }

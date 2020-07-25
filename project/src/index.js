import {
  SignInPage, SignUpPage, withAuth,
} from './components/Session'
import NavBar from './components/Navigation/NavBar'
import LandingPage from './components/LandingPage'
import StaqRoutes, { PrivateRoute } from './components/StaqRoutes'
import { initStaq, withStaq } from './withStaq'
import { withFirebase } from './components/Firebase'

export {
  LandingPage,
  NavBar,
  PrivateRoute,
  SignInPage,
  SignUpPage,
  StaqRoutes,

  initStaq,
  withAuth,
  withFirebase,
  withStaq,
}

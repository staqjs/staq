import { SignInPage, SignUpPage, withAuth } from './components/Session'
import UserSettingsPage from './components/Settings/UserSettingsPage'
import NavBar from './components/Navigation/NavBar'
import LandingPage from './components/LandingPage/LandingPage'
import Footer from './components/Footer/Footer'
import StaqRoutes, { PrivateRoute } from './components/StaqRoutes'
import { initStaq } from '../../staq'
import withStaq from './withStaq'
import { getStripeCheckoutSession, withStripe } from './withStripe'
import { withFirebase } from './components/Firebase'

export {
  PrivateRoute,
  StaqRoutes,
  NavBar,
  LandingPage,
  SignInPage,
  SignUpPage,
  UserSettingsPage,
  initStaq,
  withAuth,
  withFirebase,
  withStaq,
  withStripe,
  getStripeCheckoutSession,
  Footer
}

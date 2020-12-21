import { initStaq } from '../../staq'

// Components
// NOTE: Not exporting components for now.
//       Export pages built from components.
//       Will export components in the future.
// ...

// Pages
import LandingPage from './pages/LandingPage/LandingPage'

// Lib
import withStaq from './lib/withStaq'
import StaqRoutes, { PrivateRoute } from './lib/StaqRoutes'
import { getStripeCheckoutSession, withStripe } from './lib/withStripe'
import { withFirebase } from './lib/Firebase'
import { withAuth } from './lib/Auth'


export {
  PrivateRoute,
  StaqRoutes,
  LandingPage,
  initStaq,
  withAuth,
  withFirebase,
  withStaq,
  withStripe,
  getStripeCheckoutSession,
}

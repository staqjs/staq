import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import StaqStyleProvider from '../StaqStyleProvider'
import SettingsMenu from './SettingsMenu'
import SettingsCard from './SettingsCard'
import BillingDetails from './BillingDetails'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const useStyles = makeStyles(() => ({
  container: {
    margin: 0,
    marginLeft: 80,
    paddingLeft: 30,
    paddingRight: 30,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    color: '#f6688e',
  },
  headingText: {
    fontSize: '25px',
    paddingTop: '20px',
  },
  headingIcon: {
    fontSize: '45px',
    padding: '20px 20px 0px 0px', // top, right, bottom, left
  },
  content: {
    display: 'flex',
    marginTop: 70,
  },
  settingsMenuColumn: {
    minWidth: 160,
    maxWidth: 240,
    marginRight: 40,
    flex: '1 1',
  },
}))

function BillingSettingsPage(props) {
  const classes = useStyles()
  const { auth } = props

  return (
    <StaqStyleProvider>
      <Elements stripe={stripePromise}>
        <div className={classes.container}>

          <div className={classes.content}>
            <div className={classes.settingsMenuColumn}>
              <SettingsMenu />
            </div>

            <SettingsCard
              title="Manage subscription"
              subheader="Edit subscription details"
            >
              <BillingDetails auth={auth} />
            </SettingsCard>

          </div>
        </div>
      </Elements>
    </StaqStyleProvider>
  )
}

export default BillingSettingsPage

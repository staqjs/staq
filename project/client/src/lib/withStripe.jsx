import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe } from '@stripe/react-stripe-js'
import staqConfig from '../../../staq'

const noop = () => {}

const StripeContext = React.createContext(null)

export const withStripe = (Component) => (props) => (
  <StripeContext.Consumer>
    {(stripeContext) => <Component {...props} stripe={stripeContext.stripe} />}
  </StripeContext.Consumer>
)

const StripeProviderBase = (props) => {
  const stripe = useStripe()
  const { children } = props
  return (
    <StripeContext.Provider
      value={{
        stripe
      }}
    >
      {children}
    </StripeContext.Provider>
  )
}

export const getStripeCheckoutSession = (
  clientReferenceId,
  stripeCustomerId,
  priceId
) => {
  const firebase = staqConfig.get('firebase')
  const successUrl = staqConfig.get('Payments.CheckoutSuccessUrl')
  const cancelUrl = staqConfig.get('Payments.CheckoutCancelUrl')
  const createCheckoutSession = firebase.functions.httpsCallable(
    'createStripeCheckoutSession'
  )
  return createCheckoutSession({
    clientReferenceId,
    priceId,
    successUrl,
    cancelUrl,
    customerId: stripeCustomerId
  })
}

export default (props) => {
  const { children } = props
  const usePayments = staqConfig.get('Payments.Enabled')
  const stripePromise = usePayments
    ? loadStripe(staqConfig.get('Payments.StripePublishableKey'))
    : new Promise(noop)
  return (
    <Elements stripe={stripePromise}>
      <StripeProviderBase>{children}</StripeProviderBase>
    </Elements>
  )
}

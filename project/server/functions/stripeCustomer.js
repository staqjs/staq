import staqConfig from '../../staq'
import { getSecret } from '../util'

const functions = require('firebase-functions')
const _stripe = require("stripe")

async function createSubscription(customer) {
  try {
    const subscriptionObj = {
      customer: customer.id,
      items: [
        { price: staqConfig.get('stripeTrialPriceId') }
      ],
    }

    if (staqConfig.get('useTrial')) {
      subscriptionObj.trial_period_days = staqConfig.get('stripeTrialPeriodDays') || 14
    }

    const subscription = await stripe.subscriptions.create(subscriptionObj)
    
    return subscription
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

async function createCustomer(data, context, stripe) {
  try {
    const customer = await stripe.customers.create(data.customer)

    const subscription = staqConfig.get('paymentType') === 'subscription'
          ? createSubscription(customer)
          : null

    return {
      customer,
      subscription,
    }
  } catch (error) {
    console.error(error)
    return {
      error,
    }
  }
}

async function getCustomer(data, context, stripe) {
  try {
    const customer = await stripe.customers.retrieve(data.customerId)
    console.log('retrieved customer', customer);
    return customer
  } catch (error) {
    console.error('error retrieving customer', err)
    return {
      error
    }
  }
}

export default functions.https.onCall(async (data, context) => {
  console.log('data', data)

  const stripeSecretKey = await getSecret('stripe-secret-key')
  console.log(stripeSecretKey)
  const stripe = _stripe(stripeSecretKey)

  if (data.action === 'create') {
    return createCustomer(data, context, stripe);
  }  else if (data.action === 'get') {
    return getCustomer(data, context, stripe)
  }
})

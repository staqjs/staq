import staqConfig from '../../staq'

const functions = require('firebase-functions')
const _stripe = require("stripe")
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

async function createCustomer(data, context, stripe) {
  try {
    const customer = await stripe.customers.create(data.customer)
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

  // Get Stripe secret key from Secret Manger
  const projectNumber = staqConfig.get('gcpProjectNumber')
  const secretName = `projects/${projectNumber}/secrets/stripe-secret-key/versions/latest`
  const smClient = new SecretManagerServiceClient()
  const [version] = await smClient.accessSecretVersion({
    name: secretName
  })
  const stripeSecretKey = version.payload.data.toString()
  const stripe = _stripe(stripeSecretKey)

  if (data.action === 'create') {
    return createCustomer(data, context, stripe);
  }  else if (data.action === 'get') {
    return getCustomer(data, context, stripe)
  }
})

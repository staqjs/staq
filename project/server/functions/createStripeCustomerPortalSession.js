import { getSecret } from '../util'

const functions = require('firebase-functions')
const _stripe = require("stripe")


async function createPortalSession(data, context, stripe) {
  const session = await stripe.billingPortal.sessions.create({
    customer: data.customerId,
    return_url: data.return_url
  })

  return session
}


export default functions.https.onCall(async (data, context) => {
  console.log('data', data)

  const stripeSecretKey = await getSecret('stripe-secret-key')
  const stripe = _stripe(stripeSecretKey)

  return createPortalSession(data, context, stripe)
})

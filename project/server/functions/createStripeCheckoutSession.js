import { getSecret } from '../util'

const functions = require('firebase-functions')
const _stripe = require("stripe")


async function createCheckoutSession(data, context, stripe) {
  const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer: data.customerId,
      client_reference_id: data.clientReferenceId,
      line_items: [
          {
              price: data.priceId,
              quantity: 1
          }
      ],
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
  })

  return session
}


export default functions.https.onCall(async (data, context) => {
  console.log('data', data)

  const stripeSecretKey = getSecret('stripe-secret-key')
  const stripe = _stripe(stripeSecretKey)

  return createCheckoutSession(data, context, stripe)
})

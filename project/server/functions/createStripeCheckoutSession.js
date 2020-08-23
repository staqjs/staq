import staqConfig from '../../staq'

const functions = require('firebase-functions')
const _stripe = require("stripe")
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')


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

  // Get Stripe secret key from Secret Manger
  const projectNumber = staqConfig.get('gcpProjectNumber')
  const secretName = `projects/${projectNumber}/secrets/stripe-secret-key/versions/latest`
  const smClient = new SecretManagerServiceClient()
  const [version] = await smClient.accessSecretVersion({
    name: secretName
  })
  const stripeSecretKey = version.payload.data.toString()
  const stripe = _stripe(stripeSecretKey)

  return createCheckoutSession(data, context, stripe)
})

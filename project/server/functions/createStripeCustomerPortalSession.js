import staqConfig from '../../staq'

const functions = require('firebase-functions')
const _stripe = require("stripe")
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')


async function createPortalSession(data, context, stripe) {
  const session = await stripe.billingPortal.sessions.create({
    customer: data.customerId,
    return_url: data.return_url
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

  return createPortalSession(data, context, stripe)
})

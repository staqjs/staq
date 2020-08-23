import staqConfig from '../../staq'

const functions = require('firebase-functions')
const _stripe = require("stripe")
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

let endpointSecret
let fulfillOrder

async function onStripeCheckoutSessionCompleted(req, res, stripe) {
    const payload = req.rawBody
    const sig = req.headers['stripe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err) {
        console.error(err)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object
        fulfillOrder(session)
    }

    res.status(200).end()
}


export default functions.https.onRequest(async (req, res) => {
  // Get Stripe secret key from Secret Manger
  const projectNumber = staqConfig.get('gcpProjectNumber')
  const secretName = `projects/${projectNumber}/secrets/stripe-secret-key/versions/latest`
  const smClient = new SecretManagerServiceClient()
  const [version] = await smClient.accessSecretVersion({
    name: secretName
  })
  const stripeSecretKey = version.payload.data.toString()
  const stripe = _stripe(stripeSecretKey)

    endpointSecret = staqConfig.get('onStripeCheckoutSessionCompletedSecret')
    fulfillOrder = staqConfig.get('stripeFulfillOrder')

  onStripeCheckoutSessionCompleted(req, res, stripe)
})

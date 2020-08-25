import staqConfig from '../../staq'
import { getSecret } from '../util'

const functions = require('firebase-functions')
const _stripe = require("stripe")

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
  const stripeSecretKey = await getSecret('stripe-secret-key')
  const stripe = _stripe(stripeSecretKey)

  endpointSecret = staqConfig.get('stripeCheckoutSessionCompletedSecret')
  fulfillOrder = staqConfig.get('stripeFulfillOrder')

  onStripeCheckoutSessionCompleted(req, res, stripe)
})

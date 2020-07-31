import staqConfig from '../../staq'

const functions = require('firebase-functions')
const _stripe = require("stripe")
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

function createCustomer(data, context, stripe) {
  const starttime = new Date().getTime()
  const customer = data.customer
  const customerFields = Object.keys(customer).map(k => `${k}=${customer[k]}`).join(' ')
  console.log(`request started customer_fields=${customerFields}`)

  return stripe.customers.create(customer)
               .then((customer) => {
                 console.log('created customer', customer);
                 return customer
               })
               .catch((err) => {
                 console.error('error while creating customer', err)
                 return err
               })
}

function getCustomer(data, context, stripe) {
  const starttime = new Date().getTime()
  console.log(`request started customer_id=${data.customerId}`)

  return stripe.customers.retrieve(payload.customerId)
               .then((customer) => {
                 console.log('retrieved customer', customer);
                 return customer
               })
               .catch((err) => {
                 console.error('error retrieving customer', err)
                 return err
               })
}

export default functions.https.onCall(async (data, context) => {
  console.log('data', data)
  // console.log(`received request data='${data}' context='${context}'`)

  console.log(staqConfig)

  // Get Stripe secret key from Secret Manger
  const projectNumber = staqConfig.get('gcpProjectNumber')
  const secretName = `projects/${projectNumber}/secrets/stripe-secret-key/versions/latest`
  const smClient = new SecretManagerServiceClient()
  const [version] = await smClient.accessSecretVersion({
    name: secretName
  })
  const stripeSecretKey = version.payload.data.toString()
  const stripe = _stripe(stripeSecretKey)

  console.log(stripeSecretKey)

  if (data.action === 'create') {
    return createCustomer(data, context, stripe);
  }  else if (data.action === 'get') {
    return getCustomer(data, context, stripe)
  }
})

import staqConfig from '../../../staq'

const noop = () => { }

async function createStripeCustomer(email, onSuccess, onError) {
  const firebase = staqConfig.get('firebase')
  const stripeCustomerFn = firebase.functions.httpsCallable('stripeCustomer')
  stripeCustomerFn({
    action: 'create',
    customer: { email }
  }).then((result) => {
    onSuccess(result)
  }).catch(onError)
}

const getStripeAttributes = (stripeData) => {
  const usePayments = staqConfig.get('payments')
  const paymentType = staqConfig.get('paymentType')
  const stripeAttributes = {}

  if (usePayments) {
    stripeAttributes.stripeCustomerId = _.get(stripeData, 'customer.id')

    if (paymentType === 'subscription') {
      stripeAttributes.subscriptionPriceId = _.get(
        stripeData,
        'subscription.items.data[0].price.id'
      )
    }
  }

  return stripeAttributes
}

const createFirebaseUser = (email, password, stripeData, onSuccess, onError) => {
  const firebase = staqConfig.get('firebase')
  const stripeAttributes = getStripeAttributes(stripeData)

  firebase
    .doCreateUserWithEmailAndPassword(email, password)
    .then((currentUser) => {
      return firebase.user(currentUser.user.uid).set({
        email,
        uid: currentUser.user.uid,
        ...stripeAttributes,
      }).then(() => {
        onSuccess(user)
      })
    })
    .catch(onError)
}

const submitWithPaymentsEnabled = (userInfo, onSuccess, onError) => {
  console.log(userInfo)
  createStripeCustomer(userInfo.email, (response) => {
    if (response.statusCode && response.statusCode !== 200) {
      onError(response.code)
    } else {
      createFirebaseUser(userInfo.email, userInfo.passwordOne, response.data, onSuccess)
    }
  })
}

const submitWithPaymentsDisabled = (userInfo, onSuccess=noop, onError=noop) => {
  console.log(userInfo)
  createFirebaseUser(userInfo.email, userInfo.password, null, onSuccess, onError)
}

export const signup = (userInfo, onSuccess=noop, onError=noop) => {
  const submitFn = staqConfig.get('payments')
    ? submitWithPaymentsEnabled
    : submitWithPaymentsDisabled

  console.log('submitting')

  submitFn(userInfo, onSuccess, onError)
}

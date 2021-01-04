import staqConfig from '../../../staq'

const noop = () => {}

async function createStripeCustomer(email, onSuccess, onError) {
  const firebase = staqConfig.get('firebase')
  const stripeCustomerFn = firebase.functions.httpsCallable('stripeCustomer')
  stripeCustomerFn({
    action: 'create',
    customer: { email },
  })
    .then((result) => {
      onSuccess(result)
    })
    .catch(onError)
}

const getStripeAttributes = (stripeData) => {
  const usePayments = staqConfig.get('Payments.Enabled')
  const paymentType = staqConfig.get('Payments.Type')
  const stripeAttributes = {}

  if (usePayments) {
    stripeAttributes.stripeCustomerId = stripeData.customer.id

    if (paymentType === 'subscription') {
      stripeAttributes.subscriptionPriceId =
        stripeData.subscription.items.data[0].price.id
    }
  }

  return stripeAttributes
}

const createFirebaseUser = (
  email,
  password,
  stripeData,
  onSuccess,
  onError,
) => {
  const firebase = staqConfig.get('firebase')
  const stripeAttributes = getStripeAttributes(stripeData)
  const userDefaults = staqConfig.get('UserDefaults', {})

  firebase
    .doCreateUserWithEmailAndPassword(email, password)
    .then((currentUser) => {
      const userData = {
        email,
        uid: currentUser.user.uid,
        ...stripeAttributes,
        ...userDefaults,
      }
      return firebase
        .user(currentUser.user.uid)
        .set(userData)
        .then(() => {
          onSuccess(userData)
        })
    })
    .catch(onError)
}

const submitWithPaymentsEnabled = (userInfo, onSuccess, onError) => {
  createStripeCustomer(userInfo.email, (response) => {
    if (response.statusCode && response.statusCode !== 200) {
      onError(response.code)
    } else {
      createFirebaseUser(
        userInfo.email,
        userInfo.password,
        response.data,
        onSuccess,
      )
    }
  })
}

const submitWithPaymentsDisabled = (
  userInfo,
  onSuccess = noop,
  onError = noop,
) => {
  createFirebaseUser(
    userInfo.email,
    userInfo.password,
    null,
    onSuccess,
    onError,
  )
}

export const signup = (userInfo, onSuccess = noop, onError = noop) => {
  const submitFn = staqConfig.get('Payments.Enabled')
    ? submitWithPaymentsEnabled
    : submitWithPaymentsDisabled

  submitFn(userInfo, onSuccess, onError)
}

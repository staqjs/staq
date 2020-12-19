import React from 'react'
import _ from 'lodash'
import Firebase, { FirebaseContext } from './Firebase'
import StripeProvider from './withStripe'
import staqConfig from '../../../staq'

export default (children) => {
  const firebase = new Firebase(staqConfig.get('firebaseConfig'))
  staqConfig.set('firebase', firebase)

  return (
    <FirebaseContext.Provider value={firebase}>
      <StripeProvider>
        {children}
      </StripeProvider>
    </FirebaseContext.Provider>
  )
}

import React from 'react'
import _ from 'lodash'
import Firebase, { FirebaseContext } from './Firebase'
import { AuthProvider } from './Auth'
import StripeProvider from './withStripe'
import staqConfig from '../../../staq'

export default (children) => {
  const firebase = new Firebase(staqConfig.get('FirebaseConfig'))
  staqConfig.set('firebase', firebase)

  return (
    <FirebaseContext.Provider value={firebase}>
      <StripeProvider>
        <AuthProvider>{children}</AuthProvider>
      </StripeProvider>
    </FirebaseContext.Provider>
  )
}

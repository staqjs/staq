import React from 'react'
import _ from 'lodash'
import Firebase, { FirebaseContext } from './components/Firebase'
import { AuthProvider } from './components/Session'
import StripeProvider from './withStripe'
import staqConfig from '../../staq'

export default (children) => {
  const firebase = new Firebase(staqConfig.get('firebaseConfig'))

  return (
    <FirebaseContext.Provider value={firebase}>
      <StripeProvider>
        <AuthProvider>{children}</AuthProvider>
      </StripeProvider>
    </FirebaseContext.Provider>
  )
}

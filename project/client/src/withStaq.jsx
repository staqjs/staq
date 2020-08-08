import React from 'react'
import _ from 'lodash'
import Firebase, { FirebaseContext } from './components/Firebase'
import { AuthProvider } from './components/Session'
import staqConfig from '../../staq'

export default (children) => {
  const firebase = new Firebase(staqConfig.get('firebaseConfig'))

  return (
    <FirebaseContext.Provider value={firebase}>
      <AuthProvider>{children}</AuthProvider>
    </FirebaseContext.Provider>
  )
}

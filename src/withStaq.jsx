import React, { useEffect, useState } from 'react'
import Firebase, { FirebaseContext } from './components/Firebase'
import { AuthProvider } from './components/Session'
import staqConfig from './StaqConfig'

export const initStaq = (config) => {
  staqConfig.config = config
}

export const withStaq = (children) => {
  const firebase = new Firebase(staqConfig.get('firebaseConfig'))

  return (
    <FirebaseContext.Provider value={firebase}>
      <AuthProvider>
        { children }
      </AuthProvider>
    </FirebaseContext.Provider>
  )
}

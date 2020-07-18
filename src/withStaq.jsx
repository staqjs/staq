import React from 'react'
import Firebase, { FirebaseContext } from './components/Firebase'
import staqConfig from './StaqConfig'

export const initStaq = (config) => {
  staqConfig.firebaseConfig = config.firebaseConfig
  staqConfig.siteTitle = config.siteTitle
}

export const withStaq = (children) => {
  return (
    <FirebaseContext.Provider value={new Firebase(staqConfig.firebaseConfig)}>
      {children}
    </FirebaseContext.Provider>
  )
}

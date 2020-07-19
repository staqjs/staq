import React from 'react'
import Firebase, { FirebaseContext } from './components/Firebase'
import Auth, { AuthContext } from './components/Session'
import staqConfig from './StaqConfig'

export const initStaq = (config) => {
  staqConfig.siteTitle = config.siteTitle
  staqConfig.landingPageHeader = config.landingPageHeader
  staqConfig.landingPageSubheader = config.landingPageSubheader
  staqConfig.firebaseConfig = config.firebaseConfig
}


export const withStaq = (children) => {
  const firebase = new Firebase(staqConfig.firebaseConfig)

  return (
    <FirebaseContext.Provider value={firebase}>
      <AuthContext.Provider value={new Auth(firebase)}>
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  )
}

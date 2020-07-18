import React from 'react'
import Firebase, { FirebaseContext } from './components/Firebase'

export const withStaq = (children) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      { children }
    </FirebaseContext.Provider>
  )
}

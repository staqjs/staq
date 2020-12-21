import React from 'react'
import { Redirect } from 'react-router-dom'

import StaqStyleProvider from '../../lib/StaqStyleProvider'
import staqConfig from '../../../../staq'
import { withAuth } from '../../lib/Auth'

import SignInPageOne from './SignInPageOne'

const getSignInPageComponent = () => {
  const layoutName = staqConfig.get('Template')
  if (layoutName === 'One') {
    return SignInPageOne
  }

  return SignInPageOne
}

function SignInPage(props) {
  const { auth } = props
  const SignInPageComponent = getSignInPageComponent()

  return (
    <StaqStyleProvider>
      {auth.currentUser ? (
        <Redirect to={staqConfig.get('userHome') || '/'} />
      ) : (
        <SignInPageComponent {...props} />
      )}
    </StaqStyleProvider>
  )
}

export default withAuth(SignInPage)

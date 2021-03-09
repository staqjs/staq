import React from 'react'
import { Redirect } from 'react-router-dom'

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

  return auth.currentUser ? (
    <Redirect to={staqConfig.get('userHome') || '/'} />
  ) : (
    <SignInPageComponent {...props} />
  )
}

export default withAuth(SignInPage)

import React from 'react'
import { Redirect } from 'react-router-dom'

import staqConfig from '../../../../staq'
import { withAuth } from '../../lib/Auth'

import SignUpPageOne from './SignUpPageOne'

const getSignUpPageComponent = () => {
  const layoutName = staqConfig.get('Template')
  if (layoutName === 'One') {
    return SignUpPageOne
  }

  return SignUpPageOne
}

function SignUpPage(props) {
  const { auth } = props
  const SignUpPageComponent = getSignUpPageComponent()

  return auth.currentUser ? (
    <Redirect to={staqConfig.get('userHome') || '/'} />
  ) : (
    <SignUpPageComponent {...props} />
  )
}

export default withAuth(SignUpPage)

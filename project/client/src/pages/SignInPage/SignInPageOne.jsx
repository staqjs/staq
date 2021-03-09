import React from 'react'
import { Redirect } from 'react-router-dom'

import staqConfig from '../../../../staq'
import { withAuth } from '../../lib/Auth'

import SignInFormOne from '../../components/SignInForm/SignInFormOne'

function SignInPageOne(props) {
  const { auth } = props
  const userHome = staqConfig.get('userHome') || '/'

  return auth.currentUser ? (
    <Redirect to={userHome} />
  ) : (
    <div className={'min-h-screen flex justify-center mt-6'}>
      <SignInFormOne />
    </div>
  )
}

export default withAuth(SignInPageOne)

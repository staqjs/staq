import React from 'react'
import { Redirect } from 'react-router-dom'

import StaqStyleProvider from '../../lib/StaqStyleProvider'
import staqConfig from '../../../../staq'
import { withAuth } from '../../lib/Auth'

import ForgotPasswordPageOne from './ForgotPasswordPageOne'

const getForgotPasswordPageComponent = () => {
  const layoutName = staqConfig.get('Template')
  if (layoutName === 'One') {
    return ForgotPasswordPageOne
  }

  return ForgotPasswordPageOne
}

function ForgotPasswordPage(props) {
  const { auth } = props
  const ForgotPasswordPageComponent = getForgotPasswordPageComponent()

  return (
    <StaqStyleProvider>
      {auth.currentUser ? (
        <Redirect to={staqConfig.get('UserHome') || '/'} />
      ) : (
        <ForgotPasswordPageComponent {...props} />
      )}
    </StaqStyleProvider>
  )
}

export default withAuth(ForgotPasswordPage)

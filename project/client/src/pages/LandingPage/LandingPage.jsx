import React from 'react'
import { Redirect } from 'react-router-dom'

import StaqStyleProvider from '../../lib/StaqStyleProvider'
import staqConfig from '../../../../staq'
import { withAuth } from '../../lib/Auth'

import LandingPageOne from './LandingPageOne'

const getLandingPageComponent = () => {
  const layoutName = staqConfig.get('Template')
  if (layoutName === 'One') {
    return LandingPageOne
  }

  return LandingPageOne
}

function LandingPage(props) {
  const { auth } = props
  const LandingPageComponent = getLandingPageComponent()

  console.log(auth)

  return (
    <StaqStyleProvider>
      {auth.currentUser ? (
        <Redirect to={staqConfig.get('UserHome') || '/'} />
      ) : (
        <LandingPageComponent {...props} />
      )}
    </StaqStyleProvider>
  )
}

export default withAuth(LandingPage)

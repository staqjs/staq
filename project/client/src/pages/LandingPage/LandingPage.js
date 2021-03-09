import React from 'react'

import { Redirect } from 'react-router-dom'

import staqConfig from '../../../../staq'
import { withAuth } from '../../lib/Auth'

import LandingPageOne from './LandingPageOne'
import LandingPageTwo from './LandingPageTwo'

const getLandingPageComponent = () => {
  const layoutName = staqConfig.get('Template')
  if (layoutName === 'One') {
    return LandingPageOne
  }

  if (layoutName === 'Two') {
    return LandingPageTwo
  }

  return LandingPageOne
}

function LandingPage(props) {
  const { auth } = props
  const LandingPageComponent = getLandingPageComponent()

  return auth.currentUser ? (
    <Redirect to={staqConfig.get('UserHome') || '/'} />
  ) : (
    <LandingPageComponent {...props} />
  )
}

export default withAuth(LandingPage)

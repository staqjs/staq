import React from 'react'
import { Redirect } from 'react-router-dom'

import StaqStyleProvider from '../StaqStyleProvider'
import staqConfig from '../../../../staq'
import { withAuth } from '../Session'

import LandingPageBasic from './LandingPageBasic'
import LandingPageStory from './LandingPageStory'
import LandingPageSaaS from './LandingPageSaaS'

const getLandingPageComponent = () => {
  const layoutName = staqConfig.get('landingPageLayout')
  if (layoutName === 'Basic') {
    return LandingPageBasic
  }

  if (layoutName === 'Story') {
    return LandingPageStory
  }

  if (layoutName === 'SaaS') {
    return LandingPageSaaS
  }

  return LandingPageBasic
}

function LandingPage(props) {
  const { auth } = props
  const LandingPageComponent = getLandingPageComponent()

  return (
    <StaqStyleProvider>
      {auth.currentUser ? (
        <Redirect to={staqConfig.get('userHome') || '/'} />
      ) : (
        <LandingPageComponent {...props} />
      )}
    </StaqStyleProvider>
  )
}

export default withAuth(LandingPage)

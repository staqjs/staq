import React from 'react'
import { Redirect } from 'react-router-dom'

import StaqStyleProvider from '../StaqStyleProvider'
import staqConfig from '../../../../staq'
import { withAuth } from '../Session'

import LandingPageBasic from './LandingPageBasic'

const getLandingPageComponent = () => {
  const layoutName = staqConfig.get('landingPageLayout')
  if (layoutName === 'Basic') {
    return LandingPageBasic
  }

  return LandingPageBasic
}

const LandingPageComponent = getLandingPageComponent()

function LandingPage(props) {
  const { auth } = props

  return (
    <StaqStyleProvider>
      {
        auth.currentUser
          ? <Redirect to={staqConfig.get('userHome') || '/'} />
          : (
            <LandingPageComponent {...props} />
          )
      }
    </StaqStyleProvider>
  )
}

export default withAuth(LandingPage)

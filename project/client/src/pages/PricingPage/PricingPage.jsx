import React from 'react'
import { Redirect } from 'react-router-dom'

import staqConfig from '../../../../staq'
import { withAuth } from '../../lib/Auth'

import PricingPageOne from './PricingPageOne'

const getPricingPageComponent = () => {
  const layoutName = staqConfig.get('Template')
  if (layoutName === 'One') {
    return PricingPageOne
  }

  return PricingPageOne
}

function PricingPage(props) {
  const { auth } = props
  const PricingPageComponent = getPricingPageComponent()

  return auth.currentUser ? (
    <Redirect to={staqConfig.get('UserHome') || '/'} />
  ) : (
    <PricingPageComponent {...props} />
  )
}

export default withAuth(PricingPage)

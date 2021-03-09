import React from 'react'

import staqConfig from '../../../../staq'
import * as ROUTES from '../../constants/routes'

import PricingSectionOne from '../../components/Pricing/PricingSectionOne'
import CallToActionOne from '../../components/CallToAction/CallToActionOne'

function PricingPageOne() {
  const pricingProps = staqConfig.get('Template.Config.Pricing', {})
  const callToActionProps = staqConfig.get('Template.Config.CallToAction', {})

  return (
    <div className={''}>
      <PricingSectionOne {...pricingProps} />
      <CallToActionOne {...callToActionProps} />
    </div>
  )
}

export default PricingPageOne

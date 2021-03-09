import React from 'react'

import staqConfig from '../../../../staq'

import HeroOne from '../../components/Hero/HeroOne'
import BenefitsOne from '../../components/Benefits/BenefitsOne'
import PricingSectionOne from '../../components/Pricing/PricingSectionOne'
import CallToActionOne from '../../components/CallToAction/CallToActionOne'

function LandingPageOne() {
  const heroProps = staqConfig.get('Template.Config.Hero', {})
  const benefitsProps = staqConfig.get('Template.Config.Benefits', {})
  const pricingProps = staqConfig.get('Template.Config.Pricing', {})
  const callToActionProps = staqConfig.get('Template.Config.CallToAction', {})

  return (
    <div className={''}>
      <HeroOne {...heroProps} />
      <BenefitsOne {...benefitsProps} />
      <PricingSectionOne {...pricingProps} />
      <CallToActionOne {...callToActionProps} />
    </div>
  )
}

export default LandingPageOne

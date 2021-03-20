import React from 'react'
import 'tailwindcss/tailwind.css'

import staqConfig from '../../../../staq'

import HeroTwo from '../../components/Hero/HeroTwo'
import BenefitsTwo from '../../components/Benefits/BenefitsTwo'
import BenefitsThree from '../../components/Benefits/BenefitsThree'
import PricingSectionOne from '../../components/Pricing/PricingSectionOne'
import CallToActionOne from '../../components/CallToAction/CallToActionOne'

function LandingPageTwo() {
  console.log('here')
  const heroProps = staqConfig.get('Template.Config.Hero', {})
  const benefitsProps = staqConfig.get('Template.Config.Benefits', {})
  const featuresProps = staqConfig.get('Template.Config.Features', {})
  const pricingProps = staqConfig.get('Template.Config.Pricing', {})
  const callToActionProps = staqConfig.get('Template.Config.CallToAction', {})

  return (
    <div>
      <HeroTwo {...heroProps} />
      <BenefitsTwo {...benefitsProps} />
      <BenefitsThree {...featuresProps} />
      {/* <PricingSectionOne {...pricingProps} /> */}
      {/* <CallToActionOne {...callToActionProps} /> */}
    </div>
  )
}

export default LandingPageTwo

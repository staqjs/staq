import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import 'tailwindcss/tailwind.css'

import staqConfig from '../../../../staq'

import HeroOne from '../../components/Hero/HeroOne'
import BenefitsOne from '../../components/Benefits/BenefitsOne'
import PricingSectionOne from '../../components/Pricing/PricingSectionOne'
import CallToActionOne from '../../components/CallToAction/CallToActionOne'

const useStyles = makeStyles(() => ({
  pageContents: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#fff',
    color: '#141414',
  },
}))

function LandingPageOne() {
  const classes = useStyles()

  const heroProps = staqConfig.get('Template.Config.Hero', {})
  const benefitsProps = staqConfig.get('Template.Config.Benefits', {})
  const pricingProps = staqConfig.get('Template.Config.Pricing', {})
  const callToActionProps = staqConfig.get('Template.Config.CallToAction', {})

  return (
    <div className={classes.pageContents}>
      <HeroOne {...heroProps} />
      <BenefitsOne {...benefitsProps} />
      <PricingSectionOne {...pricingProps} />
      <CallToActionOne {...callToActionProps} />
    </div>
  )
}

export default LandingPageOne

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core'

import staqConfig from '../../../../staq'
import * as ROUTES from '../../constants/routes'

import HeroOne from '../../components/Hero/HeroOne'
import BenefitsOne from '../../components/Benefits/BenefitsOne'
import PricingSectionOne from '../../components/Pricing/PricingSectionOne'
import CallToActionOne from '../../components/CallToAction/CallToActionOne'

const useStyles = makeStyles((theme) => ({
  pageContents: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#fff',
    color: '#141414',
  }
}))

function LandingPageOne() {
  const classes = useStyles()
  const theme = useTheme()

  const heroProps         = staqConfig.get('Template.Config.Hero',         {})
  const benefitsProps     = staqConfig.get('Template.Config.Benefits',     {})
  const pricingProps      = staqConfig.get('Template.Config.Pricing',      {})
  const callToActionProps = staqConfig.get('Template.Config.CallToAction', {})

  return (
    <div className={classes.pageContents}>
      <HeroOne           {...heroProps} />
      <BenefitsOne       {...benefitsProps} />
      <PricingSectionOne {...pricingProps} />
      <CallToActionOne   {...callToActionProps} />
    </div>
  )
}

export default LandingPageOne

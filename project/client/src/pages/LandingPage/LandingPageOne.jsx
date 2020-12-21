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

  const hero = staqConfig.get('Template.Config.Hero', {})
  const benefits = staqConfig.get('Template.Config.Benefits', [])
  const pricing = staqConfig.get('Template.Config.Pricing', {})
  const callToAction = staqConfig.get('Template.Config.CallToAction', {})

  return (
    <div className={classes.pageContents}>
      <HeroOne
        primaryText={hero.PrimaryText}
        secondaryText={hero.SecondaryText}
        primaryLink={hero.PrimaryLink}
        secondaryLink={hero.SecondaryLink}
        image={hero.Image}
      />

      <BenefitsOne benefits={benefits} />

      <PricingSectionOne
        title={pricing.Title}
        subtitle={pricing.Subtitle}
        plans={pricing.Plans}
      />

      <CallToActionOne
        title={callToAction.Title}
        actionText={callToAction.ActionText}
        actionLink={callToAction.ActionLink}
      />
    </div>
  )
}

export default LandingPageOne

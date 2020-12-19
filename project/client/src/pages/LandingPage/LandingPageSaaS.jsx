import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core'

import staqConfig from '../../../../staq'
import * as ROUTES from '../../constants/routes'

import Hero from '../../components/Hero/Hero'
import Benefits from '../../components/Benefits/Benefits'

const headerFont = staqConfig.get('headerFont') || "'Montserrat', sans-serif"
const contentFont = staqConfig.get('contentFont') || "'Rubik', sans-serif"

const useStyles = makeStyles((theme) => ({
  pageContents: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#fff',
    color: '#141414',
  }
}))

function LandingPageSaaS() {
  const classes = useStyles()
  const theme = useTheme()

  const heroPrimaryText = staqConfig.get('Template.Config.Hero.PrimaryText')
  const heroSecondaryText = staqConfig.get('Template.Config.Hero.SecondaryText')
  const heroImage = staqConfig.get('Template.Config.Hero.Image')

  const benefits = staqConfig.get('Template.Config.Benefits', [])

  return (
    <div className={classes.pageContents}>
      <Hero
        primaryText={heroPrimaryText}
        secondaryText={heroSecondaryText}
        image={heroImage}
      />

      <Benefits benefits={benefits} />
    </div>
  )
}

export default LandingPageSaaS

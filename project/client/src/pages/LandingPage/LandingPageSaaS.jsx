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

import Hero from '../Hero/Hero'

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

  return (
    <div className={classes.pageContents}>
      <Hero
        primaryText="This site is built w/ Staq"
        secondaryText="Landing page, user flows, and subscription billing in < 100 lines of code"
      />
    </div>
  )
}

export default LandingPageSaaS

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Redirect } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'

import StaqStyleProvider from './StaqStyleProvider'
import staqConfig from '../StaqConfig'
import { withAuth } from './Session'
import * as ROUTES from '../constants/routes'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  banner: {
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: "'Rubik', sans-serif",
    fontSize: 48,
    fontWeight: 700,
    maxWidth: '50%',
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontFamily: "'Rubik', sans-serif",
    fontSize: 24,
    fontWeight: 400,
    maxWidth: '40%',
    textAlign: 'center',
  },
  tryItOutLink: {
    textDecoration: 'none',
  },
  tryItOutBtn: {
    marginTop: 30,
    width: 250,
    textTransform: 'none',
    fontWeight: 700,
  },
  tryItOutMessage: {
    fontStyle: 'italic',
    fontSize: 14,
    fontWeight: 300,
    marginTop: 5,
  },
}))

function Landing() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        <Typography className={classes.bannerTitle}>
          { staqConfig.get('landingPageHeader') }
        </Typography>
        <Typography className={classes.bannerSubtitle}>
          { staqConfig.get('landingPageSubheader') }
        </Typography>

        <Link className={classes.tryItOutLink} to={ROUTES.DEMO}>
          <Button
            color="primary"
            variant="contained"
            className={classes.tryItOutBtn}
          >
            Try it out for free
          </Button>
        </Link>
        <Typography className={classes.tryItOutMessage}>
          No account or credit card needed!
        </Typography>
      </div>
    </div>
  )
}

function LandingPage(props) {
  const { auth } = props

  return (
    <StaqStyleProvider>
      {
        auth.currentUser
          ? <Redirect to={staqConfig.get('userHome') || '/'} />
          : <Landing {...props} />
      }
    </StaqStyleProvider>
  )
}

export default withAuth(LandingPage)

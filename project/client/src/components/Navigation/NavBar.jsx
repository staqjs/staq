import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'

import StaqStyleProvider from '../StaqStyleProvider'
import { withFirebase } from '../Firebase'
import { withAuth } from '../Session'
import staqConfig from '../../../../staq'

import * as ROUTES from '../../constants/routes'

const contentFont = staqConfig.get('contentFont') || "'Rubik', sans-serif"

const useStyles = makeStyles((theme) => ({
  topnav: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 70,
    boxShadow: '0 0 8px lightgray',
    paddingLeft: 30,
    paddingRight: 30
  },
  topnavLhs: {
    display: 'flex',
    alignItems: 'center'
  },
  topnavRhs: {
    display: 'flex',
    alignItems: 'center'
  },
  appTitle: {
    fontFamily: theme.typography.h1.fontFamily,
    fontSize: 26,

    [theme.breakpoints.down('xs')]: {
      fontSize: 22,
    },
  },
  homeLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'black',
  },
  signInLink: {
    fontFamily: theme.typography.body1.fontFamily,
    textDecoration: 'none',
    color: 'black',
  },
  signInText: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  startTrialBtn: {
    borderRadius: 20,
    marginLeft: 15,
    textTransform: 'none',
    fontFamily: contentFont,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  logoutBtn: {
    textTransform: 'none',
    marginLeft: 25,
  },
}))

function HomeLogo() {
  const classes = useStyles()
  const logo = staqConfig.get('navbarLogo')

  return (
    <Link to='/' className={classes.homeLink}>
      { logo }
      <Typography className={classes.appTitle}>
        {staqConfig.get('siteTitle')}
      </Typography>
    </Link>
  )
}

function NavBarAuth(props) {
  const classes = useStyles()
  const history = useHistory()
  const { auth, firebase } = props

  const logout = () => {
    auth.onLogout(() => {
      auth.reload()
      history.push(ROUTES.LANDING)
    })
    firebase.doSignOut()
  }

  return (
    <div className={classes.topnav}>
      <div className={classes.topnavLhs}>
        <HomeLogo />
      </div>

      <div className={classes.topnavRhs}>
        <Link to='/settings/user' className={classes.signInLink}>
          <Typography className={classes.signInText}>Account</Typography>
        </Link>
        <Button
          variant='contained'
          className={classes.logoutBtn}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

function NavBarNonAuth(props) {
  const classes = useStyles()

  return (
    <div className={classes.topnav}>
      <div className={classes.topnavLhs}>
        <HomeLogo />
      </div>

      <div className={classes.topnavRhs}>
        <Link to='/signin' className={classes.signInLink}>
          <Typography className={classes.signInText}>Sign In</Typography>
        </Link>

        <Link to='/signup' className={classes.signInLink}>
          <Button
            color='primary'
            variant='contained'
            className={classes.startTrialBtn}
          >
            Start Free Trial
          </Button>
        </Link>
      </div>
    </div>
  )
}

function NavBar(props) {
  const { auth, firebase } = props

  return (
    <StaqStyleProvider>
      {
        auth.currentUser
          ? <NavBarAuth auth={auth} firebase={firebase} />
          : <NavBarNonAuth />
      }
    </StaqStyleProvider>
  )
}

export default withFirebase(withAuth(NavBar))

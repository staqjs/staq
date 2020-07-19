import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'

import { withFirebase } from '../Firebase'
import staqConfig from '../../StaqConfig'

import * as ROUTES from '../../constants/routes'

const useStyles = makeStyles(() => ({
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
    fontFamily: "'Rubik', sans-serif",
    fontSize: 26
  },
  homeLink: {
    textDecoration: 'none'
  },
  signInLink: {
    textDecoration: 'none'
  },
  startTrialBtn: {
    borderRadius: 20,
    marginLeft: 15,
    textTransform: 'none'
  },
  logoutBtn: {
    textTransform: 'none',
    marginLeft: 15
  }
}))

function HomeLogo() {
  const classes = useStyles()

  return (
    <Link to='/' className={classes.homeLink}>
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

  return auth.currentUser ? (
    <NavBarAuth auth={auth} firebase={firebase} />
  ) : (
    <NavBarNonAuth />
  )
}

export default withFirebase(NavBar)

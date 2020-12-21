import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import staqConfig from '../../../../staq'
import { withAuth } from '../../lib/Auth'

import SignInFormOne from '../../components/SignInForm/SignInFormOne'

const useStyles = makeStyles((theme) => ({
  signInPageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 50,
  },
}))

function SignInPageOne(props) {
  const classes = useStyles()
  const { auth } = props
  const userHome = staqConfig.get('userHome') || '/'

  return auth.currentUser
    ? <Redirect to={userHome} />
    : (
      <div className={classes.signInPageContainer}>
        <SignInFormOne />
      </div>
    )
}

export default withAuth(SignInPageOne)

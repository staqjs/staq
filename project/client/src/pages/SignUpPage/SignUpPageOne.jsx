import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Typography } from '@material-ui/core'

import { signup } from '../../lib/signup'

import SignUpFormOne from '../../components/SignUpForm/SignUpFormOne'

const useStyles = makeStyles((theme) => ({
  signupPageContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 50,
  },
}))

function SignUpPageOne(props) {
  const classes = useStyles()

  return (
    <div className={classes.signupPageContainer}>

      <SignUpFormOne />

    </div>
  )
}

export default SignUpPageOne

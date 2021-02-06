import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Typography } from '@material-ui/core'

import { signup } from '../../lib/signup'

const useStyles = makeStyles((theme) => ({
  signupFormContainer: {
    width: 500,
  },
  signupForm: {
    boxShadow: '0 0 4px #888',
    padding: 10,
    borderRadius: 4,
  },
  title: {
    marginBottom: 15,
    fontWeight: 600,
    fontSize: 18,
  },
  input: {
    width: '100%',
    marginBottom: 5,
  },
  submitBtn: {
    width: '100%',
  },
  inputs: {
    marginBottom: 20,
  },
  errorContainer: {
    marginTop: 10,
  },
  error: {
    fontSize: 14,
    color: 'red',
  },
}))

function SignUpFormOne(props) {
  const classes = useStyles()
  const history = useHistory()
  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const setField = (field, value) => {
    setState({
      ...state,
      [field]: value,
    })
  }

  const onSubmit = (e) => {
    setLoading(true)
    signup(
      state,
      (res) => {
        setLoading(false)
        history.push('/dashboard')
      },
      (error) => {
        setError(error.message)
      },
    )

    e.preventDefault()
  }

  return (
    <div className={classes.signupFormContainer}>
      <Typography className={classes.title}>Sign Up</Typography>

      <div className={classes.signupForm}>
        <form onSubmit={onSubmit}>
          <div className={classes.inputs}>
            <TextField
              value={state.email}
              onChange={(event) => setField('email', event.target.value)}
              className={classes.input}
              label="Email"
            />

            <TextField
              type="password"
              value={state.password}
              onChange={(event) => setField('password', event.target.value)}
              className={classes.input}
              label="Password"
            />

            <TextField
              type="password"
              value={state.passwordConfirmation}
              onChange={(event) =>
                setField('passwordConfirmation', event.target.value)
              }
              className={classes.input}
              label="Confirm Password"
            />
          </div>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.submitBtn}
          >
            Submit
          </Button>

          {error && (
            <div className={classes.errorContainer}>
              <span className={classes.error}>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default SignUpFormOne

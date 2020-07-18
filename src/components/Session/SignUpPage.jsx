import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'

import { withFirebase } from '../Firebase'

import * as urls from '../../constants/urls'
import * as routes from '../../constants/routes'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    maxWidth: 500,
    marginTop: 100,
  },
  input: {
    marginBottom: 10,
  },
}))


function SignUpPage(props) {
  const classes = useStyles()
  const { firebase } = props

  return (
    <div className={classes.container}>
      <SignUpForm firebase={firebase} />
    </div>
  )
}

const INITIAL_STATE = {
  contact_email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
}

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use'

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
`

function SignUpForm(props) {
  const classes = useStyles()
  const { firebase } = props
  const [user, setUser] = useState({
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null
  })
  const [loading, setLoading] = React.useState(false)

  async function createStripeCustomer(email, callback) {
    const payload = { email }
    const response = await fetch(urls.CREATE_STRIPE_CUSTOMER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then((response) => response.json())

    callback(response)
  }

  const createFirebaseUser = (email, password, stripeCustomerId, next) => {
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((currentUser) => {
        return firebase.user(currentUser.user.uid).set({
          uid: currentUser.user.uid,
          email: email
        })
      })
      .then(() => {
        return firebase.doSendEmailVerification();
      })
      .then(() => {
        setUser({ ...INITIAL_STATE })
        next(user)
        props.history.push(routes.AFTER_SIGN_UP)
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }

        setUser({ ...user, error })
        next(user)
      })
  }

  const onSubmit = (event) => {
    setLoading(true)
    createStripeCustomer(user.email, (response) => {
      if (response.statusCode && response.statusCode !== 200) {
        setUser({ ...user, error: response.code })
      } else {
        createFirebaseUser(
          user.email,
          user.passwordOne,
          response.id,
          (user) => {
            firebase.logEvent('sign_up', {
              email: user.contact_email
            })
            setLoading(false)
          }
        )
      }
    })

    event.preventDefault()
  }

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <TextField
        className={classes.input}
        name="email"
        value={user.email}
        onChange={onChange}
        type="text"
        label="Email Address"
        inputProps={{ required: true, style: { boxShadow: 'none' } }}
        />
      <TextField
        className={classes.input}
        name="passwordOne"
        value={user.passwordOne}
        onChange={onChange}
        type="password"
        label="Password"
        inputProps={{ required: true, style: { boxShadow: 'none' }}}
        />
      <TextField
        className={classes.input}
        name="passwordTwo"
        value={user.passwordTwo}
        onChange={onChange}
        type="password"
        label="Confirm Password"
        inputProps={{ required: true, style: { boxShadow: 'none' } }}
        />
      <Button
        color='primary'
        className={classes.submitBtn}
        variant='contained'
        type="submit"
      >
        Sign Up
      </Button>

      { user.error && <p>{user.error.message}</p> }
    </form>
  )
}

export default withFirebase(SignUpPage)

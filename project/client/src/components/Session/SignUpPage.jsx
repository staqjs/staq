import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'

import StaqStyleProvider from '../StaqStyleProvider'
import { withFirebase } from '../Firebase'
import staqConfig from '../../../../staq'

import * as urls from '../../constants/urls'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    maxWidth: 500,
    marginTop: 100,

    [theme.breakpoints.down('md')]: {
      width: '80%'
    }
  },
  input: {
    marginBottom: 10
  },
  submitBtn: {
    textTransform: 'none',
    fontWeight: 600
  }
}))

function SignUpPage(props) {
  const classes = useStyles()
  const { firebase } = props

  return (
    <StaqStyleProvider>
      <div className={classes.container}>
        <SignUpForm firebase={firebase} />
      </div>
    </StaqStyleProvider>
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
  const history = useHistory()
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
    const stripeCustomerFn = firebase.functions.httpsCallable('stripeCustomer')
    stripeCustomerFn({
      action: 'create',
      customer: { email }
    })
      .then((result) => {
        callback(result)
      })
      .catch((error) => {
        // Getting the Error details.
        const code = error.code
        const message = error.message
        const details = error.details
        // ...
      })
  }

  const createFirebaseUser = (email, password, stripeData, next) => {
    const stripeCustomer = stripeData.customer
    const stripeSubscription = stripeData.subscription

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((currentUser) => {
        return firebase.user(currentUser.user.uid).set({
          email,
          stripeCustomerId: stripeCustomer.id,
          stripeSubscriptionPriceId: stripeSubscription.items.data[0].price.id,
          uid: currentUser.user.uid
        })
      })
      // .then(() => {
      //   return firebase.doSendEmailVerification()
      // })
      .then(() => {
        setUser({ ...INITIAL_STATE })
        next(user)
        history.push(staqConfig.get('userHome') || '/')
      })
      .catch((error) => {
        setUser({ ...user, error })
        next(user)
      })
  }

  const onSubmitWithPaymentsEnabled = () => {
    setLoading(true)
    createStripeCustomer(user.email, (response) => {
      if (response.statusCode && response.statusCode !== 200) {
        setUser({ ...user, error: response.code })
      } else {
        createFirebaseUser(
          user.email,
          user.passwordOne,
          response.data,
          (user) => {
            firebase.logEvent('sign_up', {
              email: user.contact_email
            })
            setLoading(false)
          }
        )
      }
    })
  }

  const onSubmitWithPaymentsDisabled = () => {
    setLoading(true)
    createFirebaseUser(user.email, user.passwordOne, null, (user) => {
      firebase.logEvent('sign_up', {
        email: user.contact_email
      })
      setLoading(false)
    })
  }

  const onSubmit = (event) => {
    if (staqConfig.get('payments')) {
      onSubmitWithPaymentsEnabled()
    } else {
      onSubmitWithPaymentsDisabled()
    }

    event.preventDefault()
  }

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <TextField
        className={classes.input}
        name='email'
        value={user.email}
        onChange={onChange}
        type='text'
        label='Email Address'
        inputProps={{ required: true, style: { boxShadow: 'none' } }}
      />
      <TextField
        className={classes.input}
        name='passwordOne'
        value={user.passwordOne}
        onChange={onChange}
        type='password'
        label='Password'
        inputProps={{ required: true, style: { boxShadow: 'none' } }}
      />
      <TextField
        className={classes.input}
        name='passwordTwo'
        value={user.passwordTwo}
        onChange={onChange}
        type='password'
        label='Confirm Password'
        inputProps={{ required: true, style: { boxShadow: 'none' } }}
      />
      <Button
        color='primary'
        className={classes.submitBtn}
        variant='contained'
        type='submit'
      >
        Sign Up
      </Button>

      {user.error && <p>{user.error.message}</p>}
    </form>
  )
}

export default withFirebase(SignUpPage)

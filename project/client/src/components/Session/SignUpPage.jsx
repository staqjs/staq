import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'
import { Button, TextField, Typography } from '@material-ui/core'
import _ from 'lodash'

import StaqStyleProvider from '../StaqStyleProvider'
import { withFirebase } from '../Firebase'
import staqConfig from '../../../../staq'

import * as urls from '../../constants/urls'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    maxWidth: 500,
    marginTop: 30,

    [theme.breakpoints.down('md')]: {
      width: '80%'
    }
  },
  input: {
    marginBottom: 10
  },
  submitBtn: {
    // textTransform: 'none',
    // fontWeight: 400,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    width: '100%',
    height: 40,
    marginTop: 20,
    alignSelf: 'center'
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: 32,
    color: theme.palette.primary.main,
  },
  signinContainer: {
    display: 'flex',
    alignSelf: 'center',
    marginTop: 20,
  },
  signinMessage: {
    marginRight: 5,
    fontSize: 18,
  },
  signinLink: {
    color: theme.palette.primary.main,
    fontSize: 18,
  }
}))

function SignUpPageBase(props) {
  const classes = useStyles()
  const { firebase } = props
  const Logo = staqConfig.get('logo') || null

  return (
    <StaqStyleProvider>
      <div className={classes.container}>
        {
          Logo
            ? (
              <Link to="/">
                <Logo className={classes.icon} width={50} height={50} />
              </Link>
            )
            : null
        }

        <Typography className={classes.title}>
          Create new account
        </Typography>

        <SignUpForm firebase={firebase} />
      </div>
    </StaqStyleProvider>
  )
}

const INITIAL_STATE = {
  email: '',
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

  const getStripeAttributes = (stripeData) => {
    const usePayments = staqConfig.get('payments')
    const paymentType = staqConfig.get('paymentType')
    const stripeAttributes = {}

    if (usePayments) {
      stripeAttributes.stripeCustomerId = _.get(stripeData, 'customer.id')

      if (paymentType === 'subscription') {
        stripeAttributes.subscriptionPriceId = _.get(
          stripeData,
          'subscription.items.data[0].price.id'
        )
      }
    }

    return stripeAttributes
  }

  const createFirebaseUser = (email, password, stripeData, next) => {
    const stripeAttributes = getStripeAttributes(stripeData)

    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then((currentUser) => {
        return firebase.user(currentUser.user.uid).set({
          email,
          uid: currentUser.user.uid,
          ...stripeAttributes,
        })
          .then(() => {
            setUser({ ...INITIAL_STATE })
            next(user)
            history.push(staqConfig.get('userHome') || '/')
          })
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

      <span className={classes.signinContainer}>
        <Typography className={classes.signinMessage}>
          Already have an account?
        </Typography>

        <Link to="/signin" className={classes.signinLink}>
          Sign in
        </Link>
      </span>

      {user.error && <p>{user.error.message}</p>}
    </form>
  )
}

function SignUpPage(props) {
  return (
    <StaqStyleProvider>
      <SignUpPageBase {...props} />
    </StaqStyleProvider>
  )
}

export default withFirebase(SignUpPage)

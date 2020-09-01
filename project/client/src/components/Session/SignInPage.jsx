import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Redirect } from 'react-router-dom'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'
import { Button, TextField, Typography } from '@material-ui/core'

import StaqStyleProvider from '../StaqStyleProvider'
import { withFirebase } from '../Firebase'
import { withAuth } from './context'
import staqConfig from '../../../../staq'

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
      width: '80%',
    },
  },
  input: {
    marginBottom: 10
  },
  submitBtn: {
    marginTop: 20,
  },
  icon: {
    fill: '#3a9cbd',
    width: 50,
    height: 50,
    marginRight: 15,
  },
  title: {
    fontSize: 32,
    color: '#3a9cbd'
  },
  signupContainer: {
    display: 'flex',
    alignSelf: 'center',
    marginTop: 20,
  },
  signupMessage: {
    marginRight: 5,
    fontSize: 18,
  },
  signupLink: {
    color: '#3a9cbd',
    fontSize: 18,
  }
}))

function SignInPage(props) {
  const classes = useStyles()
  const { auth, firebase } = props

  return (
    <StaqStyleProvider>
      {
        auth.currentUser
          ? <Redirect to={staqConfig.get('userHome') || '/'} />
          : (
            <div className={classes.container}>
              <Link to="/">
                <FavoriteTwoToneIcon className={classes.icon} />
              </Link>

              <Typography className={classes.title}>
                Sign in
              </Typography>


              <SignInForm firebase={firebase} />
            </div>
          )
      }
    </StaqStyleProvider>
  )
}

function SignInForm(props) {
  const classes = useStyles()
  const { firebase } = props

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const resetState = () => {
    setEmail('')
    setPassword('')
    setError(null)
  }

  const onSubmit = (event) => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        resetState()
      })
      .catch((error) => {
        setError('Please enter a valid username and password.')
      })
    event.preventDefault()
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <TextField
        className={classes.input}
        label='Email'
        value={email}
        onChange={onChangeEmail}
        inputProps={{
          required: true,
          type: 'email',
          style: { boxShadow: 'none' }
        }}
      />
      <TextField
        className={classes.input}
        label='Password'
        value={password}
        onChange={onChangePassword}
        type='password'
        inputProps={{ required: true, style: { boxShadow: 'none' } }}
      />
      <Button
        variant='contained'
        color='primary'
        className={classes.submitBtn}
        type='submit'
      >
        Login
      </Button>

      <span className={classes.signupContainer}>
        <Typography className={classes.signupMessage}>
          Don't have an account yet?
        </Typography>

        <Link to="/signup" className={classes.signupLink}>
          Sign up
        </Link>
      </span>

      {error && (
        <Typography className={classes.errorMessage}>{error}</Typography>
      )}
    </form>
  )
}

export default withFirebase(withAuth(SignInPage))

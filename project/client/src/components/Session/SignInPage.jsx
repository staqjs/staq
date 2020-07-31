import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import { Button, TextField, Typography } from '@material-ui/core'

import StaqStyleProvider from '../StaqStyleProvider'
import { withFirebase } from '../Firebase'
import { withAuth } from './context'
import staqConfig from '../../../../staq'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    maxWidth: 500,
    marginTop: 100
  },
  input: {
    marginBottom: 10
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

      {error && (
        <Typography className={classes.errorMessage}>{error}</Typography>
      )}
    </form>
  )
}

export default withFirebase(withAuth(SignInPage))

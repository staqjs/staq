import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Redirect } from 'react-router-dom'
import { Button, TextField, Typography } from '@material-ui/core'

import StaqStyleProvider from '../../lib/StaqStyleProvider'
import { withFirebase } from '../../lib/Firebase'
import { withAuth } from '../../lib/Auth'
import staqConfig from '../../../../staq'

const useStyles = makeStyles((theme) => ({
  forgotPasswordContainer: {
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
    marginBottom: 10,
  },
  submitBtn: {
    marginTop: 20,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: 32,
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
    color: theme.palette.primary.main,
    fontSize: 18,
  },
}))

function ForgotPasswordPageBase(props) {
  const classes = useStyles()
  const { auth, firebase } = props
  const Logo = staqConfig.get('logo') || null

  return (
    <StaqStyleProvider>
      {auth.currentUser ? (
        <Redirect to={staqConfig.get('userHome') || '/'} />
      ) : (
        <div className={classes.forgotPasswordContainer}>
          {Logo ? (
            <Link to="/">
              <Logo className={classes.icon} width={50} height={50} />
            </Link>
          ) : null}

          <Typography className={classes.title}>Reset Password</Typography>

          <ForgotPasswordForm firebase={firebase} />
        </div>
      )}
    </StaqStyleProvider>
  )
}

function ForgotPasswordForm(props) {
  const classes = useStyles()
  const { firebase } = props

  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')

  const onSubmit = (event) => {
    firebase.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setError(`Sent reset instructions to ${email}`)
      })
      .catch(() => {
        setError('Error sending reset email')
      })
    event.preventDefault()
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <TextField
        className={classes.input}
        label="Email"
        value={email}
        onChange={onChangeEmail}
        inputProps={{
          required: true,
          type: 'email',
          style: { boxShadow: 'none' },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.submitBtn}
        type="submit"
      >
        Send reset instructions
      </Button>

      {error && (
        <Typography className={classes.errorMessage}>{error}</Typography>
      )}
    </form>
  )
}

function ForgotPasswordPage(props) {
  return (
    <StaqStyleProvider>
      <ForgotPasswordPageBase {...props} />
    </StaqStyleProvider>
  )
}

export default withFirebase(withAuth(ForgotPasswordPage))

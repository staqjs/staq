import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { withFirebase } from '../../lib/Firebase'
import { withAuth } from '../../lib/Auth'
import staqConfig from '../../../../staq'

function ForgotPasswordPageBase(props) {
  const { auth, firebase } = props
  const Logo = staqConfig.get('logo') || null

  return auth.currentUser ? (
    <Redirect to={staqConfig.get('userHome') || '/'} />
  ) : (
    <div className={''}>
      {Logo ? (
        <Link to="/">
          <Logo className={''} width={50} height={50} />
        </Link>
      ) : null}

      <ForgotPasswordForm firebase={firebase} />
    </div>
  )
}

function ForgotPasswordForm(props) {
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
    <div className={''}>
      <span className={''}>Reset Password</span>

      <form onSubmit={onSubmit} className={''}>
        <input
          className={''}
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
        />
        <button className={''} type="submit">
          Send reset instructions
        </button>

        {error && <span className={''}>{error}</span>}
      </form>
    </div>
  )
}

function ForgotPasswordPage(props) {
  return <ForgotPasswordPageBase {...props} />
}

export default withFirebase(withAuth(ForgotPasswordPage))

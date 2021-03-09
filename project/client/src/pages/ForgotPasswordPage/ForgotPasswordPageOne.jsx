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
    <div className={'min-h-screen flex justify-center mt-6'}>
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
    <div
      className={'w-11/12 md:w/1/2 max-w-lg max-h-40 rounded-md shadow-md p-4'}
    >
      <span className={'mb-4 font-bold'}>Reset Password</span>

      <form onSubmit={onSubmit} className={''}>
        <input
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
          className={
            'focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2 mb-2'
          }
        />
        <button
          className={
            'w-full rounded-md px-6 py-2 bg-primary text-center text-white text-contrast'
          }
          type="submit"
        >
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

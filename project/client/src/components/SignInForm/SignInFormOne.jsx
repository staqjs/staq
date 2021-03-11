import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { withFirebase } from '../../lib/Firebase'
import * as Routes from '../../constants/routes'

function SignInFormOne(props) {
  const history = useHistory()
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const { firebase } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const setField = (field, value) => {
    setState({
      ...state,
      [field]: value,
    })
  }

  const onSubmit = (e) => {
    firebase
      .doSignInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        setState({
          email: '',
          password: '',
        })
      })
      .catch((error) => {
        setError('Please enter a valid username and password.')
      })

    e.preventDefault()
  }

  return (
    <div
      className={
        'sjs-w-11/12 md:sjs-w/1/2 sjs-max-w-lg sjs-max-h-64 sjs-rounded-md sjs-shadow-md sjs-p-4'
      }
    >
      <div className={'sjs-mb-4 sjs-font-bold'}>Sign In</div>

      <div className={''}>
        <form onSubmit={onSubmit}>
          <div className={''}>
            <input
              value={state.email}
              onChange={(event) => setField('email', event.target.value)}
              placeholder="Email"
              className={
                'focus:sjs-border-light-blue-500 focus:sjs-ring-1 focus:sjs-ring-light-blue-500 focus:sjs-outline-none sjs-w-full sjs-text-sm sjs-text-black sjs-placeholder-gray-500 sjs-border sjs-border-gray-200 sjs-rounded-md sjs-py-2 sjs-pl-2 sjs-mb-2'
              }
            />

            <input
              type="password"
              value={state.password}
              onChange={(event) => setField('password', event.target.value)}
              placeholder="Password"
              className={
                'focus:sjs-border-light-blue-500 focus:sjs-ring-1 focus:sjs-ring-light-blue-500 focus:sjs-outline-none sjs-w-full sjs-text-sm sjs-text-black sjs-placeholder-gray-500 sjs-border sjs-border-gray-200 sjs-rounded-md sjs-py-2 sjs-pl-2 sjs-mb-2'
              }
            />
          </div>

          <button
            type="submit"
            className={
              'sjs-w-full sjs-rounded-md sjs-px-6 sjs-py-2 sjs-bg-primary sjs-text-center sjs-text-white sjs-text-contrast'
            }
          >
            Login
          </button>

          <Link className={'sjs-text-sm'} to={Routes.ForgotPassword}>
            Forgot your password?
          </Link>

          {error && (
            <div className={''}>
              <span className={''}>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default withFirebase(SignInFormOne)

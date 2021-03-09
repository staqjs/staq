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
      className={'w-11/12 md:w/1/2 max-w-lg max-h-64 rounded-md shadow-md p-4'}
    >
      <div className={'mb-4 font-bold'}>Sign In</div>

      <div className={''}>
        <form onSubmit={onSubmit}>
          <div className={''}>
            <input
              value={state.email}
              onChange={(event) => setField('email', event.target.value)}
              placeholder="Email"
              className={
                'focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2 mb-2'
              }
            />

            <input
              type="password"
              value={state.password}
              onChange={(event) => setField('password', event.target.value)}
              placeholder="Password"
              className={
                'focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2 mb-2'
              }
            />
          </div>

          <button
            type="submit"
            className={
              'w-full rounded-md px-6 py-2 bg-primary text-center text-white text-contrast'
            }
          >
            Login
          </button>

          <Link className={'text-sm'} to={Routes.ForgotPassword}>
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

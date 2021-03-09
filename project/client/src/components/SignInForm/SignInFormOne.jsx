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
    <div className={''}>
      <span className={''}>Sign In</span>

      <div className={''}>
        <form onSubmit={onSubmit}>
          <div className={''}>
            <input
              value={state.email}
              onChange={(event) => setField('email', event.target.value)}
              className={''}
              label="Email"
            />

            <input
              type="password"
              value={state.password}
              onChange={(event) => setField('password', event.target.value)}
              className={''}
              label="Password"
            />
          </div>

          <button
            type="submit"
            color="primary"
            variant="contained"
            className={''}
          >
            Login
          </button>

          <Link className={''} to={Routes.ForgotPassword}>
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

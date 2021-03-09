import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { signup } from '../../lib/signup'

function SignUpFormOne(props) {
  const history = useHistory()
  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const setField = (field, value) => {
    setState({
      ...state,
      [field]: value,
    })
  }

  const onSubmit = (e) => {
    setLoading(true)
    signup(
      state,
      (res) => {
        setLoading(false)
        history.push('/dashboard')
      },
      (error) => {
        setError(error.message)
      },
    )

    e.preventDefault()
  }

  return (
    <div className={''}>
      <span className={''}>Sign Up</span>

      <div className={''}>
        <form onSubmit={onSubmit}>
          <div className={''}>
            <input
              value={state.email}
              onChange={(event) => setField('email', event.target.value)}
              className={''}
            />

            <input
              type="password"
              value={state.password}
              onChange={(event) => setField('password', event.target.value)}
              className={''}
            />

            <input
              type="password"
              value={state.passwordConfirmation}
              onChange={(event) =>
                setField('passwordConfirmation', event.target.value)
              }
              className={''}
            />
          </div>

          <button type="submit" className={''}>
            Submit
          </button>

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

export default SignUpFormOne

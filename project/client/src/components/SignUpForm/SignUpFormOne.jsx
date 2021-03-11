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
    <div
      className={
        'sjs-w-11/12 md:sjs-w/1/2 sjs-max-w-lg sjs-max-h-64 sjs-rounded-md sjs-shadow-md sjs-p-4'
      }
    >
      <div className={'sjs-mb-4 sjs-font-bold'}>Sign Up</div>

      <div className={''}>
        <form onSubmit={onSubmit}>
          <div className={'mb-2'}>
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

            <input
              type="password"
              value={state.passwordConfirmation}
              onChange={(event) =>
                setField('passwordConfirmation', event.target.value)
              }
              placeholder="Confirm Password"
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

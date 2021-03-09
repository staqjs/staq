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
    <div className={'w-11/12 md:w/1/2 max-w-lg rounded-md shadow-md p-4'}>
      <div className={'mb-4 font-bold'}>Sign Up</div>

      <div className={''}>
        <form onSubmit={onSubmit}>
          <div className={'mb-2'}>
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

            <input
              type="password"
              value={state.passwordConfirmation}
              onChange={(event) =>
                setField('passwordConfirmation', event.target.value)
              }
              placeholder="Confirm Password"
              className={
                'focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2'
              }
            />
          </div>

          <button
            type="submit"
            className={
              'w-full rounded-md px-6 py-2 bg-blue-400 text-center text-white'
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

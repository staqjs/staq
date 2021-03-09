import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { signup } from '../../lib/signup'

import SignUpFormOne from '../../components/SignUpForm/SignUpFormOne'

function SignUpPageOne(props) {
  return (
    <div className={'min-h-screen flex justify-center mt-6'}>
      <SignUpFormOne />
    </div>
  )
}

export default SignUpPageOne

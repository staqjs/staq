import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { signup } from '../../lib/signup'

import SignUpFormOne from '../../components/SignUpForm/SignUpFormOne'

function SignUpPageOne(props) {
  return (
    <div className={'sjs-min-h-screen sjs-flex sjs-justify-center sjs-mt-6'}>
      <SignUpFormOne />
    </div>
  )
}

export default SignUpPageOne

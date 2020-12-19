import React from 'react'
import { Redirect } from 'react-router-dom'

import StaqStyleProvider from '../../lib/StaqStyleProvider'
import staqConfig from '../../../../staq'

import NavBarSaaS from './NavBarSaaS'

const getComponent = () => {
  const layoutName = staqConfig.get('navBarLayout')

  if (layoutName === 'SaaS') {
    return NavBarSaaS
  }

  return NavBarSaaS
}

function NavBar(props) {
  const { auth } = props
  const NavBarComponent = getComponent()

  return (
    <StaqStyleProvider>
      <NavBarComponent {...props} />
    </StaqStyleProvider>
  )
}

export default NavBar

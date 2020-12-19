import React from 'react'

import StaqStyleProvider from '../../lib/StaqStyleProvider'
import staqConfig from '../../../../staq'

import FooterBasic from './FooterBasic'

const getFooterComponent = () => {
  const layoutName = staqConfig.get('footerLayout')
  if (layoutName === 'Basic') {
    return FooterBasic
  }

  return FooterBasic
}

const FooterComponent = getFooterComponent()

function Footer(props) {
  return (
    <StaqStyleProvider>
      <FooterComponent {...props} />
    </StaqStyleProvider>
  )
}

export default Footer

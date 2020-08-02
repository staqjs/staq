import React from 'react'

import StaqStyleProvider from '../StaqStyleProvider'
import staqConfig from '../../../../staq'

import PlanCardBasic from './PlanCardBasic'

const getPlanCardComponent = () => {
  const layoutName = staqConfig.get('planCardLayout')
  if (layoutName === 'Basic') {
    return PlanCardBasic
  }

  return PlanCardBasic
}

const PlanCardComponent = getPlanCardComponent()

function PlanCard(props) {
  return (
    <StaqStyleProvider>
      <PlanCardComponent {...props} />
    </StaqStyleProvider>
  )
}

export default PlanCard

import React from 'react'

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
  return <PlanCardComponent {...props} />
}

export default PlanCard

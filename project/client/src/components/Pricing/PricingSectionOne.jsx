import React from 'react'

import PlanCardOne from './PlanCardOne'

function PricingSectionOne(props) {
  const { Title, Subtitle, Plans } = props

  return (
    <div className={'sjs-flex sjs-justify-center sjs-bg-primary sjs-p-12'}>
      <div
        className={'sjs-max-w-screen-xl sjs-flex sjs-flex-col sjs-items-center'}
      >
        <h1
          className={
            'sjs-text-4xl sjs-text-white sjs-text-contrast sjs-font-bold'
          }
        >
          {Title}
        </h1>

        <div className={'sjs-h-24'}>
          <p className={''}>{Subtitle}</p>
        </div>

        <div className={'sjs-flex sjs-flex-col md:sjs-flex-row'}>
          {Plans.map((plan) => (
            <PlanCardOne
              key={plan.Title}
              Title={plan.Title}
              Subtitle={plan.Subtitle}
              Price={plan.Price}
              Features={plan.Features}
              CtaLink={plan.CtaLink}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingSectionOne

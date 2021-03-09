import React from 'react'

import PlanCardOne from './PlanCardOne'

function PricingSectionOne(props) {
  const { Title, Subtitle, Plans } = props

  return (
    <div className={''}>
      <div className={''}>
        <h1 className={''}>{Title}</h1>

        <div className={''}>
          <p className={''}>{Subtitle}</p>
        </div>

        <div className={''}>
          {Plans.map((plan) => (
            <PlanCardOne
              key={plan.title}
              title={plan.title}
              subtitle={plan.subtitle}
              price={plan.price}
              priceDescription={plan.priceDescription}
              priceSubdescription={plan.priceSubdescription}
              features={plan.features}
              ctaLink={plan.ctaLink}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingSectionOne

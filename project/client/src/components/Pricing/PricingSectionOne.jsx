import React from 'react'

import PlanCardOne from './PlanCardOne'

function PricingSectionOne(props) {
  const { Title, Subtitle, Plans } = props

  return (
    <div className={'flex justify-center bg-blue-400 p-12'}>
      <div className={'max-w-screen-xl flex flex-col items-center'}>
        <h1 className={'text-4xl text-white font-bold'}>{Title}</h1>

        <div className={'h-24'}>
          <p className={''}>{Subtitle}</p>
        </div>

        <div className={'flex flex-col md:flex-row'}>
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

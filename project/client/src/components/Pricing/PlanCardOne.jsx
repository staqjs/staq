import React from 'react'
import { Link } from 'react-router-dom'

function PlanCardOne(props) {
  const {
    title,
    subtitle,
    price,
    priceDescription,
    priceSubdescription,
    features,
    ctaLink,
  } = props

  return (
    <article
      className={
        'sjs-bg-white sjs-rounded-md sjs-shadow sjs-p-4 md:sjs-mr-4 last:sjs-mr-0 sjs-mb-2'
      }
    >
      <div className={''}>
        <h2 className={'sjs-text-2xl sjs-font-bold'}>{title}</h2>
        <p className={'sjs-h-24'}>{subtitle}</p>

        <div className={''}>
          <div className={'sjs-flex'}>
            <span className={'sjs-text-6xl sjs-font-bold'}>
              {' '}
              {price.value}{' '}
            </span>
            <span
              className={
                'sjs-h-full sjs-flex sjs-flex-col sjs-justify-start sjs-text-sm sjs-ml-1 sjs-mt-1'
              }
            >
              {price.description}{' '}
            </span>
          </div>
          <div className={''}>{price.subdescription}</div>
        </div>
      </div>

      <hr className={'sjs-my-4'} />

      <div className={'sjs-flex sjs-flex-col'}>
        <ul className={'sjs-mb-4'}>
          {features.map((feature) => (
            <li key={feature.text} className={''}>
              <span className={''}>{feature.text}</span>
            </li>
          ))}
        </ul>

        <Link
          className={
            'sjs-w-full sjs-rounded-md sjs-shadow sjs-bg-primary sjs-px-6 sjs-py-2 sjs-mt-4 sjs-font-bold sjs-text-white sjs-text-contrast sjs-text-center'
          }
          to={ctaLink.to}
        >
          {ctaLink.text}
        </Link>
      </div>
    </article>
  )
}

export default PlanCardOne

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
      className={'bg-white rounded-md shadow p-4 md:mr-4 last:mr-0 mb-2'}
    >
      <div className={''}>
        <h2 className={'text-2xl font-bold'}>{title}</h2>
        <p className={'h-24'}>{subtitle}</p>

        <div className={''}>
          <div className={'flex'}>
            <span className={'text-6xl font-bold'}> {price.value} </span>
            <span
              className={'h-full flex flex-col justify-start text-sm ml-1 mt-1'}
            >
              {price.description}{' '}
            </span>
          </div>
          <div className={''}>{price.subdescription}</div>
        </div>
      </div>

      <hr className={'my-4'} />

      <div className={'flex flex-col'}>
        <ul className={'mb-4'}>
          {features.map((feature) => (
            <li key={feature.text} className={''}>
              <span className={''}>{feature.text}</span>
            </li>
          ))}
        </ul>

        <Link
          className={
            'w-full rounded-md bg-primary px-6 py-2 mt-4 font-bold text-white text-contrast text-center'
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

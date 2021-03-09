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
    <article className={''}>
      <div className={''}>
        <h2 className={''}>{title}</h2>
        <p className={''}>{subtitle}</p>

        <div className={''}>
          <p className={''}>
            <span className={''}> {price.value} </span>
            <span className={''}> {price.description} </span>
          </p>
          <div className={''}>{price.subdescription}</div>
        </div>
      </div>

      <hr className={''} />

      <div className={''}>
        <ul className={''}>
          {features.map((feature) => (
            <li key={feature.text} className={''}>
              <span className={''}>{feature.text}</span>
            </li>
          ))}
        </ul>

        <Link className={''} to={ctaLink.to}>
          {ctaLink.text}
        </Link>
      </div>
    </article>
  )
}

export default PlanCardOne

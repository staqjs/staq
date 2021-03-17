import React from 'react'
import { Link } from 'react-router-dom'

function PlanCardOne(props) {
  const { Title, Subtitle, Price, Features, CtaLink } = props

  return (
    <article
      className={
        'sjs-bg-white sjs-rounded-md sjs-shadow sjs-p-4 md:sjs-mr-4 last:sjs-mr-0 sjs-mb-2'
      }
    >
      <div className={''}>
        <h2 className={'sjs-text-2xl sjs-font-bold'}>{Title}</h2>
        <p className={'sjs-h-24'}>{Subtitle}</p>

        <div className={''}>
          <div className={'sjs-flex'}>
            <span className={'sjs-text-6xl sjs-font-bold'}>
              {' '}
              {Price.Value}{' '}
            </span>
            <span
              className={
                'sjs-h-full sjs-flex sjs-flex-col sjs-justify-start sjs-text-sm sjs-ml-1 sjs-mt-1'
              }
            >
              {Price.Description}{' '}
            </span>
          </div>
          <div className={''}>{Price.Subdescription}</div>
        </div>
      </div>

      <hr className={'sjs-my-4'} />

      <div className={'sjs-flex sjs-flex-col'}>
        <ul className={'sjs-mb-4'}>
          {Features.map((feature) => (
            <li key={feature.Text} className={''}>
              <span className={''}>{feature.Text}</span>
            </li>
          ))}
        </ul>

        <Link
          className={
            'sjs-w-full sjs-rounded-md sjs-shadow sjs-bg-primary sjs-px-6 sjs-py-2 sjs-mt-4 sjs-font-bold sjs-text-white sjs-text-contrast sjs-text-center'
          }
          to={CtaLink.To}
        >
          {CtaLink.Text}
        </Link>
      </div>
    </article>
  )
}

export default PlanCardOne

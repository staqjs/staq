import React from 'react'
import { Link } from 'react-router-dom'

function HeroOne(props) {
  const {
    PrimaryText,
    SecondaryText,
    Image,
    PrimaryLink,
    SecondaryLink,
  } = props

  return (
    <div className={'sjs-flex sjs-justify-center'}>
      <div
        className={
          'sjs-flex sjs-flex-col sjs-items-start lg:sjs-flex-row lg:sjs-justify-between sjs-p-6 sjs-max-w-screen-xl'
        }
      >
        <div className={'sjs-mb-6 sjs-pr-2 sjs-max-w-prose lg:sjs-max-w-2/5'}>
          <div className={'sjs-mb-6'}>
            <span className={'sjs-text-5xl'}>{PrimaryText}</span>
          </div>

          <div className={'sjs-mb-4'}>
            <span className={'sjs-text-2xl'}>{SecondaryText}</span>
          </div>

          <div className={'sjs-flex'}>
            {PrimaryLink && (
              <Link
                className={
                  'sjs-px-4 sjs-py-2 sjs-rounded-md sjs-shadow sjs-bg-primary sjs-text-white sjs-text-contrast'
                }
                to={PrimaryLink.to}
              >
                <span>{PrimaryLink.text}</span>
              </Link>
            )}

            {SecondaryLink && (
              <Link
                to={SecondaryLink.to}
                className={
                  'sjs-ml-4 sjs-px-4 sjs-py-2 sjs-rounded-md sjs-shadow sjs-ring-2 sjs-ring-black sjs-ring-inset'
                }
              >
                <span>{SecondaryLink.text}</span>
              </Link>
            )}
          </div>
        </div>
        <div className={'lg:sjs-max-w-3/5'}>
          <img src={Image} className={'sjs-object-contain sjs-rounded-md'} />
        </div>
      </div>
    </div>
  )
}

export default HeroOne

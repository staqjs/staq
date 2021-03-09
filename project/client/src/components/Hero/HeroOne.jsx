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
    <div className={'flex justify-center'}>
      <div
        className={
          'flex flex-col items-start lg:flex-row lg:justify-between p-6 max-w-screen-xl'
        }
      >
        <div className={'mb-6 pr-2 max-w-prose lg:max-w-2/5'}>
          <div className={'mb-6'}>
            <span className={'text-6xl'}>{PrimaryText}</span>
          </div>

          <div className={'mb-4'}>
            <span className={'text-2xl'}>{SecondaryText}</span>
          </div>

          <div className={'flex'}>
            {PrimaryLink && (
              <Link
                className={
                  'px-4 py-2 rounded-md bg-primary text-white text-contrast'
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
                  'ml-4 px-4 py-2 rounded-md ring-2 ring-black ring-inset'
                }
              >
                <span>{SecondaryLink.text}</span>
              </Link>
            )}
          </div>
        </div>
        <div className={'max-w-3/5'}>
          <img src={Image} className={'object-contain rounded-md'} />
        </div>
      </div>
    </div>
  )
}

export default HeroOne

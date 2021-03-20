import React from 'react'
import { Link } from 'react-router-dom'

function HeroTwo(props) {
  const { PrimaryText, SecondaryText, EmailLink } = props

  return (
    <div
      className={
        'sjs-flex sjs-justify-center sjs-min-h-lg sjs-bg-primary sjs-text-white'
      }
    >
      <div
        className={
          'sjs-flex sjs-flex-col sjs-items-center text-center mt-32 max-w-2xl'
        }
      >
        <div className={'sjs-mb-6 sjs-pr-2 flex flex-col items-center'}>
          <div className={'sjs-mb-6 text-center'}>
            <span className={'sjs-text-5xl'}>{PrimaryText}</span>
          </div>

          <div className={'sjs-mb-4 max-w-lg text-center'}>
            <span className={'sjs-text-xl'}>{SecondaryText}</span>
          </div>
        </div>

        <div className={'sjs-border-2 sjs-border-gray-500 sjs-rounded-md'}>
          <input
            type="email"
            placeholder="Enter your email"
            className={
              'sjs-p-2 sjs-text-gray-900 sjs-rounded-md sjs-rounded-r-none'
            }
          />

          <button
            className={
              'sjs-rounded-md sjs-rounded-l-none sjs-px-4 sjs-py-2 sjs-shadow sjs-bg-primary'
            }
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroTwo

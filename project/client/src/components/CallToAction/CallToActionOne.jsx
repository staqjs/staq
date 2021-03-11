import React from 'react'
import { Link } from 'react-router-dom'

function CallToActionOne(props) {
  const { Title, ActionText, ActionLink } = props

  return (
    <div className={'sjs-flex sjs-flex-col sjs-items-center sjs-p-8 sjs-my-6'}>
      <h2 className={'sjs-text-3xl sjs-font-bold'}>{Title}</h2>

      <div className={'sjs-mt-8'}>
        <Link
          className={
            'sjs-rounded-md sjs-bg-primary sjs-px-6 sjs-py-4 sjs-text-white sjs-text-contrast sjs-font-bold'
          }
          to={ActionLink}
        >
          {ActionText}
        </Link>
      </div>
    </div>
  )
}

export default CallToActionOne

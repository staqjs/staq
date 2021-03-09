import React from 'react'
import { Link } from 'react-router-dom'

function CallToActionOne(props) {
  const { Title, ActionText, ActionLink } = props

  return (
    <div className={'flex flex-col items-center p-8 my-6'}>
      <h2 className={'text-3xl font-bold'}>{Title}</h2>

      <div className={'mt-8'}>
        <Link
          className={
            'rounded-md bg-primary px-6 py-4 text-white text-contrast font-bold'
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

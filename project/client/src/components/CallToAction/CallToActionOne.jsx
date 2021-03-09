import React from 'react'
import { Link } from 'react-router-dom'

function CallToActionOne(props) {
  const { Title, ActionText, ActionLink } = props

  return (
    <div className={''}>
      <h2 className={''}>{Title}</h2>

      <div className={''}>
        <div className={''}>
          <Link className={''} to={ActionLink}>
            {ActionText}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CallToActionOne

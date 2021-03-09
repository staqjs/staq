import React from 'react'
import { Link } from 'react-router-dom'
import staqConfig from '../../../../staq'

const headerFont = staqConfig.get('headerFont') || "'Montserrat', sans-serif"
const contentFont = staqConfig.get('contentFont') || "'Rubik', sans-serif"

/*
 * Plan:
 *   - name
 *   - price
 *   - features
 */
function PlanCardBasic(props) {
  const { type, name, price, features } = props

  return (
    <div className={''}>
      <div className={''}>{name}</div>
      <div className={''}>
        {price ? (
          <div className={''}>
            <span component="span" className={''}>
              $
            </span>
            <span component="span" className={''}>
              {price}
            </span>
            {type === 'monthly' ? (
              <span component="span" className={''}>
                /mo
              </span>
            ) : null}
          </div>
        ) : null}

        <ul className={''}>
          {features.map((feature) => {
            return (
              <li key={feature} className={''}>
                <span className={''}>{feature}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={''}>
        <Link to="/signup" className={''}>
          <button className={''}>Get Started</button>
        </Link>
      </div>
    </div>
  )
}

export default PlanCardBasic

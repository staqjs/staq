import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import PlanCardOne from './PlanCardOne'

const useStyles = makeStyles((theme) => ({
  pricingSectionContainer: {
    paddingTop: 60,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  pricingContainer: {
    paddingBottom: '8rem',
    marginBottom: 0,
    paddingLeft: '3rem',
    paddingRight: '3rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
  },
  sectionTitle: {
    fontSize: '2.25rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '0.75rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: theme.palette.primary.contrastText,
  },
  subtitleContainer: {
    justifyContent: 'center',
    display: 'flex',
    maxWidth: '32rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  planCardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}))

function PricingSectionOne(props) {
  const classes = useStyles()
  const { Title, Subtitle, Plans } = props

  return (
    <div className={classes.pricingSectionContainer}>
      <div className={classes.pricingContainer}>
        <h1 className={classes.sectionTitle}>
          { Title }
        </h1>

        <div className={classes.subtitleContainer}>
          <p className={classes.subtitle}>
            { Subtitle }
          </p>
        </div>

        <div className={classes.planCardsContainer}>
         {
           Plans.map(plan => (
             <PlanCardOne
               key={plan.title}
               title={plan.title}
               subtitle={plan.subtitle}
               price={plan.price}
               priceDescription={plan.priceDescription}
               priceSubdescription={plan.priceSubdescription}
               features={plan.features}
               ctaLink={plan.ctaLink}
             />
           ))
          }
        </div>
      </div>
    </div>
  )
}

export default PricingSectionOne

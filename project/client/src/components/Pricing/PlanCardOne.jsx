import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  planCardContainer: {
    borderColor: '#212121',
    borderTopWidth: '0.625rem',
    paddingBottom: '1.25rem',
    border: '0 solid',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    width: 350,
    marginRight: 15,

    '&:last-child': {
      marginRight: 0,
    },

    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: 20,

      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  topSection: {
    padding: '1.5rem',
    border: '0 solid',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    letterSpacing: '-.01em',
    lineHeight: 1.3,
    fontSize: '1.125rem',
    margin: 0,
    minHeight: 23,
  },
  priceInfoContainer: {
    width: '100%',
    height: '6rem',
    display: 'flex',
    flexDirection: 'column',
  },
  priceInfoPrimary: {
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: '0.875rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.4,
    marginTop: 'auto',
    margin: 0,
  },
  price: {
    letterSpacing: '-0.03em',
    marginRight: '0.5rem',
    lineHeight: 1.2,
    fontSize: '2.625rem',
    fontWeight: 700,
  },
  priceDescription: {
    marginTop: 7,
  },
  priceInfoSecondary: {
    opacity: 0.5,
    minHeight: 18,
  },
  divider: {
    '--text-opacity': 1,
    color: 'rgba(205,205,205,var(--text-opacity))',
    borderTopWidth: 1,
    margin: 0,
    height: 0,
    overflow: 'visible',
    border: '0 solid',
  },
  midSection: {
    padding: '1.5rem',
    border: '0 solid',
    boxSizing: 'border-box',
  },
  featureList: {
    letterSpacing: '-0.01em',
    lineHeight: 1.4,
    fontSize: '1rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  featureListItem: {
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '-0.01em',
    lineHeight: 1.4,
    listStyle: 'none',
    padding: 0,
  },
  featureText: {
    margin: 0,
  },
  ctaLink: {
    color: '#fff',
    backgroundColor: '#625df5',
    fontSize: '1.125rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
    borderRadius: '0.375rem',
    padding: '1rem 1.25rem',
    fontWeight: 700,
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
    marginTop: '1.5rem',
    textDecoration: 'inherit',
    boxSizing: 'border-box',
  }
}))

function PlanCardOne(props) {
  const classes = useStyles()
  const {
    title, subtitle, price, priceDescription,
    priceSubdescription, features, ctaLink,
  } = props

  return (
    <article className={classes.planCardContainer}>
      <div className={classes.topSection}>
        <h2 className={classes.title}>
          { title }
        </h2>
        <p className={classes.subtitle}>
          { subtitle }
        </p>

        <div className={classes.priceInfoContainer}>
          <p className={classes.priceInfoPrimary}>
            <span className={classes.price}> { price.value } </span>
            <span className={classes.priceDescription}> { price.description } </span>
          </p>
          <div className={classes.priceInfoSecondary}>
            { price.subdescription }
          </div>
        </div>
      </div>

      <hr className={classes.divider} />

      <div className={classes.midSection}>
        <List className={classes.featureList}>
          {
            features.map((feature) => (
              <ListItem key={feature.text} className={classes.featureListItem}>
                <ListItemText className={classes.featureText} primary={feature.text} />
              </ListItem>
            ))
          }
        </List>

        <Link className={classes.ctaLink} to={ctaLink.to}>
          { ctaLink.text }
        </Link>
      </div>
    </article>
  )
}

export default PlanCardOne

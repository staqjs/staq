import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  heroSection: {
    paddingTop: '96px',
    paddingBottom: '96px',
    backgroundColor: '#fff',
  },
  heroContainer: {
    width: '100%',
    maxWidth: '1296px',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: '24px',
    paddingLeft: '24px',
  },
  gridHalves: {
    display: 'grid',
    '-webkit-box-align': 'center',
    '-webkit-align-items': 'center',
    '-ms-flex-align': 'center',
    alignItems: 'center',
    gridAutoColumns: '1fr',
    gridColumnGap: '24px',
    gridRowGap: '16px',
    '-ms-grid-rows': 'auto',
    gridTemplateRows: 'auto',
    gridTemplateColumns: '1fr 1fr',
  },
  heroText: {
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '506px',
    width: '100%',
  },
  heroTextPrimary: {
    fontSize: '54px',
    lineHeight: '54px',
    fontWeight: 700,
    marginBottom: '24px',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  heroTextSecondary: {
    fontSize: '20px',
    lineHeight: '30px',
    letterSpacing: '-.01em',
    fontFamily: "'Space Grotesk',sans-serif",
  },
  heroImage: {
    height: 500,
    borderRadius: 6
  },
  heroActionsRow: {
    display: 'flex',
    marginTop: '36px',
    gridColumnGap: 0,
    gridRowGap: 0,
    '-ms-grid-columns': '.75fr .75fr',
    gridTemplateColumns: '.75fr .75fr',
    '-ms-grid-rows': 'auto',
    gridTemplateRows: 'auto',
    gridAutoColumns: '1fr',
    justifyItems: 'stretch',
    '-webkit-box-align': 'center',
    alignItems: 'center',
  },
  heroPrimaryAction: {
    padding: '18px 36px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    '-webkit-box-pack': 'center',
    justifyContent: 'center',
    '-webkit-box-align': 'center',
    alignItems: 'center',
    borderRadius: 6,
    fontWeight: 600,
    textAlign: 'center',
    cursor: 'pointer',
    fontFamily: "'IBM Plex Mono', sans-serif",
    textDecoration: 'none',
  },
  heroSecondaryAction: {
    marginLeft: 12,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(20,20,20,.1)',
    backgroundColor: 'transparent',
    color: '#141414',
    padding: '18px 36px',
    display: 'flex',
    '-webkit-box-pack': 'center',
    justifyContent: 'center',
    '-webkit-box-align': 'center',
    alignItems: 'center',
    borderRadius: 6,
    fontWeight: 600,
    textAlign: 'center',
    cursor: 'pointer',
    fontFamily: "'IBM Plex Mono', sans-serif",
    textDecoration: 'none',
  }
}))

function Hero(props) {
  const classes = useStyles()
  const {
    PrimaryText, SecondaryText, Image,
    PrimaryLink, SecondaryLink,
  } = props

  return (
    <div className={classes.heroSection}>
      <div className={classes.heroContainer}>
        <div className={classes.gridHalves}>
          <div className={classes.heroText}>
            <div className={classes.heroTextPrimaryContainer}>
              <h1 className={classes.heroTextPrimary}>
                { PrimaryText }
              </h1>
            </div>

            <div className={classes.heroTextSecondaryContainer}>
              <div className={classes.heroTextSecondary}>
                { SecondaryText }
              </div>
            </div>

            <div className={classes.heroActionsContainer}>
              <div className={classes.heroActionsRow}>

                {
                  PrimaryLink && (
                    <Link className={classes.heroPrimaryAction} to={PrimaryLink.to}>
                      <div>{ PrimaryLink.text }</div>
                    </Link>
                  )
                }

                {
                  SecondaryLink && (
                    <div className={classes.heroSecondaryActionContainer}>
                      <Link className={classes.heroSecondaryAction} to={SecondaryLink.to}>
                        <div>{ SecondaryLink.text }</div>
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className={classes.heroImageContainer}>
            <img
              src={Image}
              className={classes.heroImage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

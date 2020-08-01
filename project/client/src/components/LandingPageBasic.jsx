import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {
  Button, Card, CardHeader, CardContent,
  Typography,
} from '@material-ui/core'

import staqConfig from '../../../staq'
import * as ROUTES from '../constants/routes'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  banner: {
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: "'Rubik', sans-serif",
    fontSize: 48,
    fontWeight: 700,
    maxWidth: '50%',
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontFamily: "'Rubik', sans-serif",
    fontSize: 24,
    fontWeight: 400,
    maxWidth: '40%',
    textAlign: 'center',
  },
  tryItOutLink: {
    textDecoration: 'none',
  },
  tryItOutBtn: {
    marginTop: 30,
    width: 250,
    textTransform: 'none',
    fontWeight: 700,
  },
  tryItOutMessage: {
    fontStyle: 'italic',
    fontSize: 14,
    fontWeight: 300,
    marginTop: 5,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 100,
  },
  image: {
    width: '75%',
    maxWidth: 1300,
  },
  valueSection: {
    padding: 20,
    marginBottom: 100,
    paddingTop: 140,
    paddingBottom: 140,
    margin: '0 auto',
  },
  valueSectionTitle: {
    fontFamily: "'Rubik', sans-serif",
    fontSize: 42,
    fontWeight: 700,
    maxWidth: '50%',
    textAlign: 'center',
    margin: 'auto',
    marginBottom: 40,
  },
  valueCardsContainer: {
    padding: '0 32px',
    maxWidth: 1200,
    display: 'flex',
  },
  card: {
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 1px 4px 0px rgba(0,0,0,0.14), 0px 2px 4px 0px rgba(0,0,0,0.12)',
    marginRight: 20,
    padding: 25,
  },
  content: {
    fontWeight: 500,
  }
}))

function ValueCard(props) {
  const classes = useStyles()
  const { title, text } = props

  return (
    <Card className={classes.card}>
      <CardHeader title={title} className={classes.header} />
      <CardContent className={classes.content}>
        { text }
      </CardContent>
    </Card>
  )
}

function ValueSection(props) {
  const classes = useStyles()
  const values = staqConfig.get('values') || []
  const title = staqConfig.get('valueSectionTitle') || null

  return (
    <div className={classes.valueSection}>
      <Typography className={classes.valueSectionTitle}>
        { title }
      </Typography>

      <div className={classes.valueCardsContainer}>
        {
          values.map((value) => {
            return (
              <ValueCard title={value.title} text={value.text} />
            )
          })
        }
      </div>
    </div>
  )
}

function LandingPageBasic() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        <Typography className={classes.bannerTitle}>
          { staqConfig.get('landingPageHeader') }
        </Typography>
        <Typography className={classes.bannerSubtitle}>
          { staqConfig.get('landingPageSubheader') }
        </Typography>

        <Link className={classes.tryItOutLink} to={ROUTES.DEMO}>
          <Button
            color="primary"
            variant="contained"
            className={classes.tryItOutBtn}
          >
            Try it out for free
          </Button>
        </Link>
        <Typography className={classes.tryItOutMessage}>
          No account or credit card needed!
        </Typography>
      </div>

      <div className={classes.imageContainer}>
        <img src={staqConfig.get('landingPageImage')} className={classes.image} />
      </div>

      <ValueSection />
    </div>
  )
}

export default LandingPageBasic

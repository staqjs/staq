import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Link } from 'react-router-dom'
import {
  Button, Card, CardHeader, CardContent,
  Typography,
} from '@material-ui/core'

import staqConfig from '../../../../staq'
import * as ROUTES from '../../constants/routes'

import PlanCard from '../PlanCard/PlanCard'

const headerFont = staqConfig.get('headerFont') || "'Montserrat', sans-serif"
const contentFont = staqConfig.get('contentFont') || "'Rubik', sans-serif"

const useStyles = makeStyles((theme) => ({
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
    marginTop: 30,
    marginBottom: 30,
  },
  bannerTitle: {
    fontFamily: headerFont,
    fontSize: 48,
    fontWeight: 700,
    maxWidth: '50%',
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      textAlign: 'left',
    },
  },
  bannerSubtitle: {
    fontFamily: contentFont,
    fontSize: 24,
    fontWeight: 400,
    maxWidth: '40%',
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      textAlign: 'left',
    },
  },
  tryItOutLink: {
    textDecoration: 'none',
  },
  tryItOutBtn: {
    marginTop: 30,
    width: 250,
    textTransform: 'none',
    fontWeight: 700,
    fontFamily: contentFont,
  },
  tryItOutMessage: {
    fontFamily: contentFont,
    fontSize: 14,
    fontWeight: 300,
    marginTop: 5,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '75%',
    maxWidth: 1300,
  },
  valueSection: {
    padding: 20,
    paddingTop: 140,
    paddingBottom: 70,
    margin: '0 auto',
  },
  valueSectionTitle: {
    fontFamily: headerFont,
    fontSize: 42,
    fontWeight: 700,
    maxWidth: '70%',
    textAlign: 'center',
    margin: 'auto',
    marginBottom: 40,

    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      textAlign: 'left',
    },
  },
  valueCardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 32px',
    maxWidth: 1200,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  valueCard: {
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 1px 4px 0px rgba(0,0,0,0.14), 0px 2px 4px 0px rgba(0,0,0,0.12)',
    marginRight: 20,
    padding: 25,
    maxWidth: '30%',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
      marginBottom: 20,
      marginRight: 0,
    },
  },
  valueCardTitle: {
    fontFamily: headerFont,
  },
  content: {
    fontWeight: 500,
  },
  pricingSection: {
    padding: 20,
    paddingTop: 140,
    paddingBottom: 140,
    margin: '0 auto',
  },
  pricingSectionTitle: {
    fontFamily: headerFont,
    fontSize: 42,
    fontWeight: 700,
    maxWidth: '70%',
    textAlign: 'center',
    margin: 'auto',
    marginBottom: 40,

    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
      textAlign: 'left',
    },
  },
  pricingCardsContainer: {
    padding: '0 20px',
    maxWidth: 1200,
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}))

function ValueCard(props) {
  const classes = useStyles()
  const { title, text } = props

  return (
    <Card className={classes.valueCard}>
      <CardHeader
        title={title}
        titleTypographyProps={{
          className: classes.valueCardTitle
        }}
        className={classes.header}
      />
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
              <ValueCard key={value.title} title={value.title} text={value.text} />
            )
          })
        }
      </div>
    </div>
  )
}

function PricingSection() {
  const classes = useStyles()
  const plans = staqConfig.get('plans') || []
  const title = staqConfig.get('pricingSectionTitle') || null

  return (
    <div className={classes.pricingSection}>
      <Typography className={classes.pricingSectionTitle}>
        { title }
      </Typography>

      <div className={classes.pricingCardsContainer}>
        {
          plans.map((plan) => {
            return (
              <PlanCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                features={plan.features}
              />
            )
          })
        }
      </div>
    </div>
  )
}

function LandingPageBasic() {
  const classes = useStyles()
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.down('xs'))

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
        {
          xsScreen
            ? <img src={staqConfig.get('landingPageImageXs')} className={classes.image} />
            : <img src={staqConfig.get('landingPageImage')} className={classes.image} />
        }
      </div>

      <ValueSection />

      <PricingSection />
    </div>
  )
}

export default LandingPageBasic

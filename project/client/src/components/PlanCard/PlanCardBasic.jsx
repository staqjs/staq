import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {
  Button, Card, CardHeader, CardContent,
  Typography, List, ListItem,
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import staqConfig from '../../../../staq'

const headerFont = staqConfig.get('headerFont') || "'Montserrat', sans-serif"
const contentFont = staqConfig.get('contentFont') || "'Rubik', sans-serif"

const useStyles = makeStyles(() => ({
  card: {
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 1px 4px 0px rgba(0,0,0,0.14), 0px 2px 4px 0px rgba(0,0,0,0.12)',
    marginRight: 20,
    padding: 10,
    width: 300,
  },
  title: {
    fontFamily: headerFont,
  },
  price: {
    display: 'block',
  },
  dollarSign: {
    display: 'inline',
    verticalAlign: 'top',
    lineHeight: '56px',
    fontFamily: headerFont,
  },
  priceValue: {
    display: 'inline',
    verticalAlign: 'bottom',
    fontSize: 56,
    fontFamily: headerFont,
  },
  unitTime: {
    display: 'inline',
    verticalAlign: 'sub',
    fontFamily: headerFont,
    lineHeight: '56px',
  },
  featureText: {
    display: 'flex',
    fontFamily: contentFont,
  },
  checkIcon: {
    marginRight: 10,
  },
  getStartedLink: {
    textDecoration: 'none',
  },
  getStartedBtn: {
    width: '100%',
    marginTop: 20,
    textTransform: 'none',
    fontWeight: 600,
  },
}))

/*
 * Plan:
 *   - name
 *   - price
 *   - features
 */
function PlanCardBasic(props) {
  const classes = useStyles()
  const { name, price, features } = props

  return (
    <Card className={classes.card}>
      <CardHeader
        title={name}
        titleTypographyProps={{
          className: classes.title,
        }}
        className={classes.header}
      />
      <CardContent className={classes.content}>
        {
          price
            ? (
              <div className={classes.price}>
                <Typography component="span" className={classes.dollarSign}>$</Typography>
                <Typography component="span" className={classes.priceValue}>
                  { price }
                </Typography>
                <Typography component="span" className={classes.unitTime}>/mo</Typography>
              </div>
            )
            : null
        }

        <List className={classes.features}>
          {
            features.map((feature) => {
              return (
                <ListItem key={feature} className={classes.feature}>
                  <Typography className={classes.featureText}>
                    <CheckIcon className={classes.checkIcon} />
                    { feature }
                  </Typography>
                </ListItem>
              )
            })
          }
        </List>

        <Link to="/signup" className={classes.getStartedLink}>
          <Button
            color="primary"
            variant="contained"
            className={classes.getStartedBtn}
          >
            Get Started
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default PlanCardBasic

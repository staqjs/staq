import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import staqConfig from '../../../../staq'
import * as ROUTES from '../../constants/routes'

function LandingPageStory(props) {
  const classes = useStyles()
  const image = staqConfig.get('landingPageImage')

  return (
    <div className={classes.container}>
      <div className={classes.textSection}>
        <Typography variant='h2' className={classes.title} >Self-Care Reminder</Typography>

        <Typography variant='h6' className={classes.paragraph}>
          The world we live in today is full of things that stress us out. Negativity on the internet makes its way to us all too easily. It seems like there’s no escape. In the midst of all this chaos, we have forgotten ourselves. For many of us taking time out of our day to tend to our own needs is almost an afterthought.
        </Typography>

        <Typography variant='h6' className={classes.paragraph}>
          We created self-care reminder to remind ourselves that our lives are about more than what’s happening to us. Our lives are about us: about how we’re feeling today, about the internal strength and confidence we need to keep it all going, and about remembering that we need tending to as well.
        </Typography>

        <Typography variant='h6' className={classes.paragraph}>
          Send yourself or a loved one a daily email for 10 days, to remind them that self-care is a priority, now more than ever. You can decide what time the email arrives each day, and pick the time zone of the recipient. Every email is different, and reminds you to focus on a different aspect of self care.
        </Typography>

        <Typography variant='h6' className={classes.paragraph}>
          You can sign up for free without a credit card to see all the emails that you’ll receive. And when you’re ready to buy, then you can pay and get access to the email course for yourself or a loved one!
        </Typography>

        <Link className={classes.link} to={ROUTES.SIGN_UP}>
          <Button
            variant='contained'
            className={classes.button}
          >
            Get Started
          </Button>
        </Link>

      </div>
      <img
        src={staqConfig.get('landingPageImage')}
        className={classes.image}
        alt="Photo by Joshua Earl on Unsplash"
      />
    </div>
  )
}

export default LandingPageStory

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    backgroundColor: '#ffffff',
  },
  image: {
    height: 'calc(100vh - 179px)',
    width: '50%'
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    padding: 150,
    // paddingTop: 0,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Arial',
    marginBottom: 30,
    color: '#000000'
  },
  paragraph: {
    fontFamily: 'Arial',
    marginBottom: 20,
    color: '#000000',
    lineHeight: 1.65
  },
  button: {
    marginTop: 10,
    backgroundColor: '#3a9cbd',
    color: 'white',
    width: 200,
    height: 50,
    borderRadius: 30,
    '&:hover': {
      // backgroundColor: '#81c2d8'
      backgroundColor: '#286a81'
    }
  },
  link: {
    textDecoration: 'none',
    alignSelf: 'center',
  }
}))

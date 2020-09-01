import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'
import { Link } from 'react-router-dom'
import staqConfig from '../../../../staq'
import * as ROUTES from '../../constants/routes'

function LandingPageStory(props) {
  const classes = useStyles()
  const image = staqConfig.get('landingPageImage')

  return (
    <div className={classes.container}>
      <div className={classes.textSection}>
        <span className={classes.headerRow}>
          <FavoriteTwoToneIcon className={classes.icon} />
          <Typography variant='h2' className={classes.title} >Self-Care Reminder</Typography>
        </span>

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
          You can sign up for free without a credit card to see all the emails that you’ll receive. And when you’re ready to buy, then you can pay $5 and get access to the email course for yourself or a loved one!
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

      <div className={classes.imageContainer}>
        <img
          src={staqConfig.get('landingPageImage')}
          className={classes.image}
          alt="Photo by Joshua Earl on Unsplash"
        />
      </div>
    </div>
  )
}

export default LandingPageStory

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    minHeight: 'calc(100vh - 178px)',
    height: 'fit-content',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    fill: '#3a9cbd',
    width: 50,
    height: 50,
    marginRight: 15,

    [theme.breakpoints.down('md')]: {
      width: 30,
      height: 30,
    }
  },
  imageContainer: {
    flexGrow: 0,
    flexShrink: 0,
    width: '50%',
    display: 'inline-block',
    position: 'relative',

    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  image: {
    objectPosition: 'right',
    objectFit: 'cover',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  textSection: {
    display: 'flex',
    alignSelf: 'center',
    flexGrow: 1,
    flexShrink: 1,
    width: '50%',
    flexDirection: 'column',
    padding: 150,
    justifyContent: 'center',
    margin: '0 auto',

    [theme.breakpoints.down('md')]: {
      padding: 40,
    }
  },
  title: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    color: '#000000',
    fontSize: '3.2rem',

    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem'
    }
  },
  paragraph: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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

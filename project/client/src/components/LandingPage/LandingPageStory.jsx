import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import staqConfig from '../../../../staq'

const useStyles = makeStyles(() => ({}))

function LandingPageStory(props) {
  const classes = useStyles()
  const image = staqConfig.get('landingPageImage')

  // <Link to='/settings/user' className={classes.signInLink}>
  //   <Typography className={classes.signInText}>Account</Typography>
  // </Link>
  // <Button
  //   variant='contained'
  //   className={classes.logoutBtn}
  //   onClick={logout}
  // >
  //   Logout
  // </Button>

  return (
    <div>
      Story
      <img src={staqConfig.get('landingPageImage')} className={classes.image} />
    </div>
  )
}

export default LandingPageStory

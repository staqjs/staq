import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: 10,
  },
  userDetailsSaveBtn: {
    // backgroundColor: COLORS.bgSecondary,
    alignSelf: 'flex-end',
    color: 'white',
    marginTop: 15,
    textTransform: 'none',
    fontWeight: 600,

    '&:hover': {
      backgroundColor: '#048bdb',
    },
  },
}))


function UserDetails(props) {
  const classes = useStyles()
  const {
    userDetails, setUserDetailsField, saveUserDetails,
  } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    saveUserDetails()
  }

  return (
    <div className={classes.container}>
      <Typography className={classes.title}>
        User Details
      </Typography>
      <form className={classes.form}>
        <input
          value={userDetails.email}
          type="email"
          required={true}
          disabled={true}
        />

      </form>
    </div>
  )
}

export default UserDetails

        // <TextField
        //   fullWidth
        //   label="Email"
        //   onChange={(event) => { setUserDetailsField('email', event.target.value) }}
        //   type="email"
        //   value={userDetails.email}
        //   required
        //   disabled
        // />

        /* <Button
            className={classes.userDetailsSaveBtn}
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            >
            Save
            </Button> */

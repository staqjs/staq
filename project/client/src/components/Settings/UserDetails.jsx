import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  userDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: 0,
      alignItems: 'flex-start',
      marginTop: 50,
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
  },
  input: {
    width: '100%',
    marginLeft: 10,
    fontSize: 15,
    padding: 5,
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
    <div className={classes.userDetailsContainer}>
      <form className={classes.form}>
        <div className={classes.row}>
          Email:

          <input
            className={classes.input}
            value={userDetails.email}
            type="email"
            required={true}
            disabled={true}
          />
        </div>
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

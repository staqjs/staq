import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  userDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
  },
  userDetailsForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  userDetailsSaveBtn: {
    alignSelf: 'flex-start',
    textTransform: 'none',
    fontWeight: 600,
  },
  message: {
    marginLeft: 20,
    color: theme.palette.primary.main,
    fontSize: 22,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
  },
}))

function Password(props) {
  const classes = useStyles()
  const { sendPasswordResetEmail, passwordResetMessage } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    sendPasswordResetEmail()
  }

  return (
    <div className={classes.userDetailsContainer}>
      <h4 className={classes.userDetailsTitle}>
        Password Reset
      </h4>
      <form className={classes.userDetailsForm}>

        <div className={classes.actions}>
          <Button
            color="primary"
            className={classes.userDetailsSaveBtn}
            variant="contained"
            onClick={handleSubmit}
            type="submit"
          >
            Send Reset Instructions
          </Button>

          {
            passwordResetMessage
              ? (
                <Typography className={classes.message}>
                  { passwordResetMessage }
                </Typography>
              )
              : null
          }
        </div>
      </form>
    </div>
  )
}

export default Password

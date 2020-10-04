import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { withAuth } from '../Session'
import { withFirebase } from '../Firebase'

import StaqStyleProvider from '../StaqStyleProvider'
import SettingsCard from './SettingsCard'
import UserDetails from './UserDetails'
import Password from '../PasswordReset/Password'

const useStyles = makeStyles((theme) => ({
  settingsContainer: {
    margin: 0,
    marginLeft: 80,
    paddingLeft: 30,
    paddingRight: 30,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',

    [theme.breakpoints.down('md')]: {
      margin: 0,
      padding: 0,
    }
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    color: '#f6688e',
  },
  headingText: {
    fontSize: '25px',
    paddingTop: '20px',
  },
  headingIcon: {
    fontSize: '45px',
    padding: '20px 20px 0px 0px', // top, right, bottom, left
  },
  content: {
    display: 'flex',
    marginTop: 110,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: 0,
      alignItems: 'flex-start',
      marginTop: 50,
    }
  },
  settingsMenuColumn: {
    minWidth: 160,
    maxWidth: 240,
    marginRight: 40,
    flex: '1 1',
  },
}))

function UserSettingsPage(props) {
  const classes = useStyles()
  const { auth, firebase } = props
  const [userDetails, setUserDetails] = React.useState(auth.currentUser)
  const [passwordResetMessage, setPasswordResetMessage] = React.useState(null)

  const saveUserDetails = () => {
    firebase.user(auth.currentUser.uid).update(userDetails)
  }

  const sendPasswordResetEmail = () => {
    const userEmail = auth.currentUser.email
    firebase.auth.sendPasswordResetEmail(userEmail)
      .then(() => {
        setPasswordResetMessage(`Sent reset instructions to ${userEmail}`)
      })
      .catch(() => {
        setPasswordResetMessage('Error sending reset email')
      })
  }

  const setUserDetailsField = (fieldName, value) => {
    setUserDetails({
      ...userDetails,
      [fieldName]: value,
    })
  }

  return (
    <StaqStyleProvider>
      <div className={classes.settingsContainer}>
        <div className={classes.content}>
          {/* <div className={classes.settingsMenuColumn}>
              <SettingsMenu React={React} />
              </div> */}

          <SettingsCard
            React={React}
            title="My Account"
          >
            <UserDetails
              React={React}
              userDetails={userDetails}
              setUserDetailsField={setUserDetailsField}
              saveUserDetails={saveUserDetails}
            />

            <Password
              passwordResetMessage={passwordResetMessage}
              sendPasswordResetEmail={sendPasswordResetEmail}
            />

          </SettingsCard>
        </div>
      </div>
    </StaqStyleProvider>
  )
}

export default withFirebase(withAuth(UserSettingsPage))

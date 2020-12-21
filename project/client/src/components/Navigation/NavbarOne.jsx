import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import staqConfig from '../../../../staq'
import { withAuth } from '../../lib/Auth'
import { withFirebase } from '../../lib/Firebase'

const useStyles = makeStyles((theme) => ({
  navbar: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    zIndex: 99,
    backgroundColor: '#fff',
    fontFamily: "'Space Grotesk', sans-serif",
    height: 90,
  },
  navbarContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr',
    gridTemplateRows: 'auto',
    gridAutoColumns: '1fr',
    gridColumnGap: 16,
    gridRowGap: 16,
    '-webkit-box-pack': 'justify',
    justifyContent: 'space-between',
    '-webkit-box-align': 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1296,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: 24,
    paddingLeft: 24,
  },
  navbarBrand: {
    float: 'left',
    color: '#333',
    position: 'relative',
    textDecoration: 'none',
    fontSize: 24,
    lineHeight: '24px',
  },
  navbarMenuLinks: {
    justifySelf: 'center',
    display: 'flex',
    '-webkit-box-align': 'center',
    alignItems: 'center',
    fontWeight: 600,
    float: 'right',
    position: 'relative',
  },
  navbarMenuLink: {
    marginLeft: 12,
    marginRight: 12,
    transition: 'opacity .2s ease',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#141414',
  },
  navbarButtonContainer: {
    justifySelf: 'end',
    display: 'flex',
  },
  navbarButton: {
    '-webkit-box-flex': 0,
    flex: '0 0 auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(20,20,20,.1)',
    backgroundColor: 'transparent',
    color: '#141414',
    display: 'flex',
    padding: '12px 24px',
    '-webkit-box-pack': 'center',
    '-ms-flex-pack': 'center',
    justifyContent: 'center',
    '-webkit-box-align': 'center',
    alignItems: 'center',
    borderRadius: 6,
    transition: 'box-shadow .2s ease',
    fontWeight: 600,
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    textTransform: 'none',
  }
}))

function NavBarOne(props) {
  const classes = useStyles()
  const history = useHistory()
  const { auth, firebase } = props

  const siteTitle = staqConfig.get('SiteTitle')
  const menuLinks = staqConfig.get('Template.Config.Navbar.MenuLinks', [])
  const getStartedLink = staqConfig.get('Template.Config.Navbar.GetStartedLink', '/signup')

  const onClickSignOut = () => {
    auth.onLogout(() => {
      history.push('/')
    })
    firebase.doSignOut()
  }

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarContainer}>
        <Link to="/" className={classes.navbarBrand}>
          { siteTitle }
        </Link>

        {
          auth.currentUser
          ? <div></div>
          : (
            <nav role="navigation" className={classes.navbarMenuLinks}>
              {
                menuLinks.map((menuLink) => (
                  <Link key={menuLink.to} to={menuLink.to} className={classes.navbarMenuLink}>
                    { menuLink.text }
                  </Link>
                ))
              }
            </nav>
          )
        }

        {
          auth.currentUser
          ? (
            <div className={classes.navbarButtonContainer}>
              <Button
                color="primary"
                className={classes.navbarButton}
                onClick={onClickSignOut}
              >
                Sign Out
              </Button>
            </div>
          )
          : (
            <div className={classes.navbarButtonContainer}>
              <Link to={getStartedLink} className={classes.navbarButton}>
                Get Started
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default withFirebase(withAuth(NavBarOne))

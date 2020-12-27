import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1296,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: 24,
    paddingLeft: 24,
  },
  navbarBrandLink: {
    float: 'left',
    color: '#333',
    position: 'relative',
    textDecoration: 'none',
    fontSize: 24,
    lineHeight: '24px',
  },
  navbarLogo: {
    marginRight: 10,
  },
  navbarBrand: {
    display: 'flex',
    alignItems: 'center',
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

function RegularSizeNavbar(props) {
  const classes = useStyles()
  const { auth, firebase } = props

  const logo = staqConfig.get('Logo')
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
        <Link to="/" className={classes.navbarBrandLink}>
          <span className={classes.navbarBrand}>
            {
              logo && (
                <img src={logo} className={classes.navbarLogo} />
              )
            }
            { siteTitle }
          </span>
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

function NonAuthMenu(props) {
  const classes = useStyles()
  const history = useHistory()
  const { menuLinks } = props

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const onClickMenuLink = (menuLink) => {
    history.push(menuLink.to)
    handleClose()
  }


  return (
    <div className={classes.menuContainer}>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          menuLinks.map(menuLink => (
            <MenuItem key={menuLink.to} onClick={() => onClickMenuLink(menuLink)}>
              { menuLink.text }
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}

function AuthMenu(props) {
  const classes = useStyles()
  const history = useHistory()
  const { auth, firebase } = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const onClickSignOut = () => {
    auth.onLogout(() => {
      history.push('/')
    })
    firebase.doSignOut()
  }

  return (
    <div className={classes.menuContainer}>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={onClickSignOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  )
}

function SmallScreenavbar(props) {
  const classes = useStyles()
  const { auth, firebase } = props

  const logo = staqConfig.get('Logo')
  const siteTitle = staqConfig.get('SiteTitle')
  const menuLinks = staqConfig.get('Template.Config.Navbar.MenuLinks', [])
  const getStartedLink = staqConfig.get('Template.Config.Navbar.GetStartedLink', '/signup')

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarContainer}>
        <Link to="/" className={classes.navbarBrandLink}>
          <span className={classes.navbarBrand}>
            {
              logo && (
                <img src={logo} className={classes.navbarLogo} />
              )
            }
            { siteTitle }
          </span>
        </Link>

        {
          auth.currentUser
          ?
            <AuthMenu auth={auth} firebase={firebase} />
          : (
            <NonAuthMenu
              menuLinks={menuLinks}
            />
          )
        }
      </div>
    </div>
  )
}

function NavBarOne(props) {
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return xsScreen
    ? <SmallScreenavbar {...props} />
    : <RegularSizeNavbar {...props} />
}

export default withFirebase(withAuth(NavBarOne))

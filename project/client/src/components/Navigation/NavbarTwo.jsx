import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import staqConfig from '../../../../staq'
import { withAuth } from '../../lib/Auth'
import { withFirebase } from '../../lib/Firebase'

function RegularSizeNavbar(props) {
  const history = useHistory()
  const { auth, firebase } = props

  const logo = staqConfig.get('Logo')
  const siteTitle = staqConfig.get('SiteTitle')
  const menuLinks = staqConfig.get('Template.Config.Navbar.MenuLinks', [])
  const getStartedLink = staqConfig.get(
    'Template.Config.Navbar.GetStartedLink',
    '/signup',
  )

  const onClickSignOut = () => {
    auth.onLogout(() => {
      history.push('/')
    })
    firebase.doSignOut()
  }

  return (
    <div className={'flex'}>
      <div className={'flex'}>
        <Link to="/" className={''}>
          <span className={''}>
            {logo && <img src={logo} className={''} />}
            {siteTitle}
          </span>
        </Link>

        {auth.currentUser ? (
          <div></div>
        ) : (
          <nav role="navigation" className={''}>
            {menuLinks.map((menuLink) => (
              <Link key={menuLink.to} to={menuLink.to} className={''}>
                {menuLink.text}
              </Link>
            ))}
          </nav>
        )}

        {auth.currentUser ? (
          <div className={''}>
            <Button color="primary" className={''} onClick={onClickSignOut}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div className={''}>
            <Link to={getStartedLink} className={''}>
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function NonAuthMenu(props) {
  const history = useHistory()
  const { menuLinks } = props

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickMenuLink = (menuLink) => {
    history.push(menuLink.to)
    handleClose()
  }

  return (
    <div className={''}>
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
        {menuLinks.map((menuLink) => (
          <MenuItem key={menuLink.to} onClick={() => onClickMenuLink(menuLink)}>
            {menuLink.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

function AuthMenu(props) {
  const history = useHistory()
  const { auth, firebase } = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickSignOut = () => {
    auth.onLogout(() => {
      history.push('/')
    })
    firebase.doSignOut()
  }

  return (
    <div className={''}>
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
  const { auth, firebase } = props

  const logo = staqConfig.get('Logo')
  const siteTitle = staqConfig.get('SiteTitle')
  const menuLinks = staqConfig.get('Template.Config.Navbar.MenuLinks', [])
  const getStartedLink = staqConfig.get(
    'Template.Config.Navbar.GetStartedLink',
    '/signup',
  )

  return (
    <div className={''}>
      <div className={''}>
        <Link to="/" className={''}>
          <span className={''}>
            {logo && <img src={logo} className={''} />}
            {siteTitle}
          </span>
        </Link>

        {auth.currentUser ? (
          <AuthMenu auth={auth} firebase={firebase} />
        ) : (
          <NonAuthMenu menuLinks={menuLinks} />
        )}
      </div>
    </div>
  )
}

function NavBarTwo(props) {
  return <RegularSizeNavbar {...props} />
}

export default withFirebase(withAuth(NavBarTwo))

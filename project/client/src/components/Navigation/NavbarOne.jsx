import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

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
    <div className={'grid grid-flow-row grid-cols-3 p-6'}>
      <Link to="/" className={''}>
        <span className={'flex items-center'}>
          {logo && <img src={logo} className={'pr-4'} />}
          <span className={'text-xl font-bold'}>{siteTitle}</span>
        </span>
      </Link>

      {auth.currentUser ? (
        <div></div>
      ) : (
        <nav role="navigation" className={'text-center'}>
          {menuLinks.map((menuLink) => (
            <Link key={menuLink.to} to={menuLink.to} className={'p-4'}>
              {menuLink.text}
            </Link>
          ))}
        </nav>
      )}

      {auth.currentUser ? (
        <div className={'text-right'}>
          <button className={''} onClick={onClickSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className={'text-right'}>
          <Link
            to={getStartedLink}
            className={'rounded-md ring-2 ring-black px-4 py-2'}
          >
            Get Started
          </Link>
        </div>
      )}
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

function NavBarOne(props) {
  return <RegularSizeNavbar {...props} />
}

export default withFirebase(withAuth(NavBarOne))

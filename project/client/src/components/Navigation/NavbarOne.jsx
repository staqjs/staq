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
    <div className={'sjs-flex sjs-justify-center'}>
      <div
        className={
          'sjs-w-full sjs-max-w-screen-xl sjs-grid sjs-grid-flow-row sjs-grid-cols-3 sjs-p-6'
        }
      >
        <Link to="/" className={''}>
          <span className={'sjs-flex sjs-items-center'}>
            {logo && <img src={logo} className={'sjs-pr-4'} />}
            <span className={'sjs-text-xl sjs-font-bold'}>{siteTitle}</span>
          </span>
        </Link>

        {auth.currentUser ? (
          <div></div>
        ) : (
          <nav role="navigation" className={'sjs-text-center'}>
            {menuLinks.map((menuLink) => (
              <Link key={menuLink.to} to={menuLink.to} className={'sjs-p-4'}>
                {menuLink.text}
              </Link>
            ))}
          </nav>
        )}

        {auth.currentUser ? (
          <div className={'sjs-text-right'}>
            <button
              className={
                'sjs-rounded-md sjs-ring-2 sjs-ring-black sjs-px-4 sjs-py-2'
              }
              onClick={onClickSignOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className={'sjs-text-right'}>
            <Link
              to={getStartedLink}
              className={
                'sjs-rounded-md sjs-ring-2 sjs-ring-black sjs-px-4 sjs-py-2'
              }
            >
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

  return <div className={''}></div>
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

  return <div className={''}></div>
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

import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import staqConfig from '../../../../staq'

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
  }
}))

function NavBarSaaS(props) {
  const classes = useStyles()
  const menuLinks = staqConfig.get('Template.Config.Navbar.MenuLinks', [])

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarContainer}>
        <Link to="#" className={classes.navbarBrand}>
          Staq.js Live Demo
        </Link>

        <nav role="navigation" className={classes.navbarMenuLinks}>
          {
            menuLinks.map((menuLink) => (
              <Link to={menuLink.to} className={classes.navbarMenuLink}>
                { menuLink.text }
              </Link>
            ))
          }
        </nav>

        <div className={classes.navbarButtonContainer}>
          <Link to="/pricing" className={classes.navbarButton}>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBarSaaS

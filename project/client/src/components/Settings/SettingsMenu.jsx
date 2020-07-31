import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { List, ListItem, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  sectionMenuContainer: {
    fontFamily: 'Arial',
  },
  sectionMenuHeader: {
    textTransform: 'uppercase',
    color: '#7171a6',
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 5,
  },
  sectionMenu: {
    listStyleType: 'none',
  },
  menuItem: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 5,
    transition: 'background-color 96ms linear',
    fontSize: 14,
  },
  menuLink: {
    textDecoration: 'none',
    color: 'black',
    width: '100%',
    padding: 5,
    borderRadius: 4,

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  menuItemText: {
  },
  menuItemTextPrimary: {
    fontSize: 12,
  },
}))

const sideMenuItems = [
  {
    title: 'My account',
    path: '/settings/user',
  },
  {
    title: 'Manage subscription',
    path: '/settings/billing',
  },
]

function SettingsMenu(props) {
  const classes = useStyles()

  return (
    <div className={classes.sectionMenuContainer}>
      <Typography className={classes.sectionMenuHeader}>
        Account
      </Typography>

      <List className={classes.sectionMenu}>
        {
          sideMenuItems.map((menuItem) => {
            return (
              <ListItem key={menuItem.path} className={classes.menuItem}>
                <Link to={menuItem.path} className={classes.menuLink}>
                  { menuItem.title }
                </Link>
              </ListItem>
            )
          })
        }
      </List>
    </div>
  )
}

export default SettingsMenu

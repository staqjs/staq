import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  ctaContainer: {
    marginLeft: 200,
    marginRight: 200,
    marginBottom: 0,
    marginTop: 0,
    textAlign: 'center',
    padding: '100px 50px',

    [theme.breakpoints.down('md')]: {
      marginRight: 0,
      marginLeft: 0,
    },
  },
  title: {
    margin: 0,
    fontSize: 36,
    fontWeight: 700,
  },
  actionRow: {
    marginTop: 50,
    textAlign: 'center',
  },
  linkBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    padding: '18px 36px',
    fontFamily: "'IBM Plex Mono', sans-serif",
    fontWeight: 400,
    borderRadius: 6,
  }
}))

function CallToActionOne(props) {
  const classes = useStyles()
  const { Title, ActionText, ActionLink } = props

  return (
    <div className={classes.ctaContainer}>
      <h2 className={classes.title}>
        { Title }
      </h2>

      <div className={classes.actionRow}>
        <div className={classes.linkContainer}>
          <Link className={classes.linkBtn} to={ActionLink}>
            { ActionText }
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CallToActionOne

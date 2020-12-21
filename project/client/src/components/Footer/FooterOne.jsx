import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { Portal } from 'react-portal'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 50,
    paddingBottom: 20,
    backgroundColor: theme.palette.primary.main,
    minHeight: 500,
  },
  columns: {
    display: 'flex',
    justifyContent: 'center',
    // height: 500,
  },
  column: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  columnTitle: {
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
    textAlign: 'left',
    marginBottom: 15,
  },
  columnLinks: {
    display: 'flex',
    flexDirection: 'column',
  },
  footerLink: {
    fontSize: 14,
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    marginBottom: 10,
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  copyright: {
    fontSize: 14,
    color: theme.palette.primary.contrastText,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  poweredByContainer: {
    display: 'flex',
  },
  poweredByPrefix: {
    fontSize: 14,
    opacity: 0.8,
    marginRight: 5,
    color: theme.palette.primary.contrastText,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  poweredByLink: {
    display: 'flex',
    textDecoration: 'none',
  },
  poweredByStaq: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.primary.contrastText,

    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
}))

function FooterColumn(props) {
  const classes = useStyles()
  const { title, links } = props

  return (
    <div className={classes.column}>
      <div className={classes.columnTitle}>
        { title }
      </div>
      <div className={classes.columnLinks}>
        {
          links.map((link) => {
            return _.startsWith(link, '/') ?
              (
              <Link key={link.link} to={link.link} className={classes.footerLink}>
                { link.text }
              </Link>
              )
              : ( <a key={link.link} href={link.link} className={classes.footerLink}> { link.text } </a> )
          })
        }
      </div>
    </div>
  )
}

function PoweredByStaq() {
  const classes = useStyles()

  return (
    <div className={classes.poweredByContainer}>
      <a href="https://staqjs.com" className={classes.poweredByLink}>
        <Typography className={classes.poweredByPrefix}>
          Powered by
        </Typography>

        <Typography className={classes.poweredByStaq}>
          staqjs
        </Typography>
      </a>
    </div>
  )
}

function FooterOne(props) {
  const classes = useStyles()
  const { columns, copyright, poweredByStaq } = props

  console.log(props)

  return (
    <Portal>
      <div className={classes.container}>
        <div className={classes.columns}>
          {
            columns.map((column) => {
              return (
                <FooterColumn
                  key={column.title}
                  title={column.title}
                  links={column.links}
                />
              )
            })
          }
        </div>

        <div className={classes.bottom}>
          <div className={classes.legal}>
            <Typography className={classes.copyright}>
              &copy; { copyright }
            </Typography>
          </div>

          {
            (poweredByStaq || false)
              ? <PoweredByStaq />
              : null
          }
        </div>
      </div>
    </Portal>
  )
}

export default FooterOne

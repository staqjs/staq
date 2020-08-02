import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Portal } from 'react-portal'

import staqConfig from '../../../../staq'

const headerFont = staqConfig.get('headerFont') || "'Montserrat', sans-serif"
const contentFont = staqConfig.get('contentFont') || "'Rubik', sans-serif"

const useStyles = makeStyles((theme) => ({
  container: {
    height: 500,
    padding: 50,
    backgroundColor: theme.palette.primary.main,
  },
  columns: {
    display: 'flex',
    justifyContent: 'center',
  },
  column: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  columnTitle: {
    fontFamily: headerFont,
    fontWeight: 600,
    color: theme.palette.primary.contrastText,
    textAlign: 'left',
    marginBottom: 15,
  },
  footerLink: {
    fontFamily: contentFont,
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
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
            return (
              <Link key={link.link} to={link.link} className={classes.footerLink}>
                { link.text }
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

function FooterBasic(props) {
  const classes = useStyles()
  const footerColumns = staqConfig.get('footerColumns') || []

  return (
    <Portal>
      <div className={classes.container}>
        <div className={classes.columns}>
          {
            footerColumns.map((footerColumn) => {
              return (
                <FooterColumn
                  key={footerColumn.title}
                  title={footerColumn.title}
                  links={footerColumn.links}
                />
              )
            })
          }
        </div>
      </div>
    </Portal>
  )
}

export default FooterBasic

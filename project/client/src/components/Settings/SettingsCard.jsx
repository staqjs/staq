import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardHeader, CardContent } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  card: {
    width: '50%',
    maxWidth: 1200,
    minWidth: 600,

    [theme.breakpoints.down('md')]: {
      width: '90%',
      minWidth: 0,
      alignSelf: 'center',
    }
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    padding: 20,
    color: theme.palette.primary.contrastText,
  },
  subheader: {
    color: theme.palette.primary.contrastText,
  },
}))

function SettingsCard(props) {
  const classes = useStyles()
  const { title, subheader, children } = props

  return (
    <Card className={classes.card}>
      <CardHeader
        title={title}
        subheader={subheader}
        subheaderTypographyProps={{
          className: classes.subheader,
        }}
        className={classes.header}
      />
      <CardContent className={classes.content}>
        { children }
      </CardContent>
    </Card>
  )
}

export default SettingsCard

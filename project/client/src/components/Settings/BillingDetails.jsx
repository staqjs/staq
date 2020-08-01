import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'

import { withFirebase } from '../Firebase'
import { withAuth } from '../Session'
import staqConfig from '../../../../staq'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    marginTop: 5,
    paddingTop: 20,
    borderTop: '1px solid grey',

    '&:nth-child(1)': {
      paddingTop: 0,
      borderTop: 'none',
    },
  },
  addCardBtn: {
    color: '#069af3',
  },
  cardList: {
    width: 250,
  },
  cardListItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardListItemLhs: {
    display: 'flex',
  },
  cardBrand: {
    marginLeft: 15,
  },
  cardIcon: {
    fill: '#069af3',
  },
  manageBillingBtn: {
    boxShadow: 'none',
    width: 'fit-content',
  },
  manageBillingBtnLabel: {
    display: 'flex',
    justifyContent: 'flex-start',
    textTransform: 'none',
    marginRight: 10,
  },
  linkText: {
    marginRight: 10,
  },
  launchIcon: {
    width: 20,
    height: 20,
  },
}))

function BillingDetails(props) {
  const classes = useStyles()
  const { auth, firebase } = props

  const onClickManageBilling = () => {
    const createPortalSession = firebase.functions.httpsCallable('createStripeCustomerPortalSession')
    createPortalSession({
      customerId: auth.currentUser.stripeCustomerId,
      return_url: staqConfig.get('urlBase'),
    }).then((result) => {
      window.location = result.data.url
    }).catch((error) => {
      // Getting the Error details.
      const code = error.code;
      const message = error.message;
      const details = error.details;
      // ...
    })
  }

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        classes={{
          root: classes.manageBillingBtn,
          label: classes.manageBillingBtnLabel,
        }}
        onClick={onClickManageBilling}
      >
        <Typography className={classes.linkText}>
          Manage billing with Stripe
        </Typography>
        <LaunchIcon style={{
          width: 20,
          height: 20,
        }} />
      </Button>
    </div>
  )
}

export default withFirebase(withAuth(BillingDetails))

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import { withFirebase } from '../Firebase'
import { withAuth } from '../Session'
import staqConfig from '../../../../staq'

const useStyles = makeStyles(() => ({
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
        className={classes.manageBillingBtn}
        onClick={onClickManageBilling}
      >
        Manage Billing
      </Button>
    </div>
  )
}

export default withFirebase(withAuth(BillingDetails))

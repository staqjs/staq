import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  footerContainer: {
    padding: '10vh 6vh',
  },
  footerBlockInner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: 30,
    maxWidth: 1280,
    margin: 'auto',
  },
  footerTextPrimary: {
    fontFamily: "'Space Grotesk',sans-serif",
    fontSize: 32,
    marginBottom: '0.5em',
    margin: 0,
  },
  footerTextSecondary: {
    fontFamily: "'Space Grotesk',sans-serif",
    margin: '1rem 0',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    width: '100%',
  },
  formControl: {
    position: 'relative',
    flex: '1 1 auto',
    width: '1%',
    marginBottom: 0,
    border: '1px solid #e9e9e9',
    borderRight: 'none',
    paddingLeft: 15,
    borderRadius: '0.2rem 0 0 0.2rem',
    margin: 0,
    backgroundColor: '#fff',
  },
  btnInline: {
    background: '#000',
    color: '#fff',
    padding: '.95em 1.5em',
    border: '2px solid #000',
    borderRadius: '0 0.2rem 0.2rem 0',
    position: 'relative',
    display: 'inline-block',
    margin: 0,
  }
})


function CallToActionOne(props) {
  const classes = useStyles()
  const { PrimaryText, SecondaryText } = props

  return (
    <div className={classes.footerSection}>
      <div className={classes.footerContainer}>
        <div className={classes.footerBlockInner}>
          <div className={classes.footerText}>
            <h2 className={classes.footerTextPrimary}>
              { PrimaryText }
            </h2>
            <p className={classes.footerTextSecondary}>
              { SecondaryText }
            </p>
          </div>

          <div className={classes.footerForm}>
            <form className={classes.signupForm}>
              <div className={classes.inputGroup}>
                <TextField
                  className={classes.formControl}
                  InputProps={{
                    disableUnderline: true,
                    style: { height: '100%', }
                  }}
                />

                <span className={classes.inputGroupBtn}>
                  <Button
                    className={classes.btnInline}
                  >
                    Get Started
                  </Button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToActionOne

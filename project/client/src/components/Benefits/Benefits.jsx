import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  benefitsSection: {

  },
  benefitsContainer: {
    paddingTop: '3.3vmax',
    paddingBottom: '3.3vmax',
    justifyContent: 'center',
    paddingRight: 55,
    paddingLeft: 55,
    margin: '0 auto',
    boxSizing: 'content-box',
    display: 'flex',
    width: '100%',
    position: 'relative',
    maxWidth: 1200,
  },
  benefitsContent: {
    width: '100%',
    maxWidth: 1200,
    color: '#3c4547',
    overflowWrap: 'break-word',
  },
  row: {
    marginLeft: -17,
    marginRight: -17,
    width: 'auto',
    color: '#3c4547'
  },
  blocks: {
    paddingTop: 0,
    clear: 'both',
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 17,
    position: 'relative',
    height: 'auto',
  },
  gridContainer: {
    margin: '4.5vw 0 7.5vw',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridColumnGap: 40,
    alignItems: 'start',
    display: 'grid',
    maxWidth: 1280,
    gridGap: 60,
  },
  miniTitle: {
    fontFamily:  "'IBM Plex Mono', sans-serif",
    fontSize: 14,
  },
  boxTitle: {
    fontFamily: "'Space Grotesk',sans-serif",
    fontWeight: 500,
    fontSize: 24,
  },
  boxMessage: {
    fontFamily: "'Space Grotesk', sans-serif",
  }
})


function BenefitsBox(props) {
  const classes = useStyles()
  const { miniTitle, title, message } = props

  return (
    <div className={classes.box}>
      <p className={classes.miniTitle}>
        { miniTitle }
      </p>
      <h4 className={classes.boxTitle}>
        { title }
      </h4>
      <p className={classes.boxMessage}>
       { message }
      </p>
    </div>
  )
}


function Benefits(props) {
  const classes = useStyles()
  const { benefits } = props

  return (
    <div className={classes.benefitsSection}>
      <div className={classes.benefitsContainer}>
        <div className={classes.benefitsContent}>
          <div className={classes.columns}>
            <div className={classes.row}>
              <div className={classes.blocks}>
                <div className={classes.gridContainer}>

                  {
                    benefits.map((benefit) => (
                      <BenefitsBox
                        key={benefit.miniTitle}
                        miniTitle={benefit.miniTitle}
                        title={benefit.title}
                        message={benefit.message}
                      />
                    ))
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Benefits

import React from 'react'

function BenefitsBox(props) {
  const { miniTitle, title, message } = props

  return (
    <div className={''}>
      <p className={''}>{miniTitle}</p>
      <h4 className={''}>{title}</h4>
      <p className={''}>{message}</p>
    </div>
  )
}

function BenefitsOne(props) {
  const { Benefits } = props

  return (
    <div className={''}>
      <div className={''}>
        <div className={''}>
          <div className={''}>
            <div className={''}>
              <div className={''}>
                <div className={''}>
                  {Benefits.map((benefit) => (
                    <BenefitsBox
                      key={benefit.miniTitle}
                      miniTitle={benefit.miniTitle}
                      title={benefit.title}
                      message={benefit.message}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BenefitsOne

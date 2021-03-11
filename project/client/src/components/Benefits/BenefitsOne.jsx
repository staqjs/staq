import React from 'react'

function BenefitsBox(props) {
  const { miniTitle, title, message } = props

  return (
    <div className={'sjs-bg-white sjs-rounded-md shadow sjs-m-2 sjs-p-2'}>
      <p className={'sjs-text-gray-400'}>{miniTitle}</p>
      <p className={'sjs-font-medium'}>{title}</p>
      <p className={''}>{message}</p>
    </div>
  )
}

function BenefitsOne(props) {
  const { Benefits } = props

  return (
    <div className={'sjs-flex sjs-justify-center sjs-py-16'}>
      <div className={'sjs-max-w-screen-xl'}>
        <div className={'sjs-px-4'}>
          <div
            className={
              'sjs-grid sjs-grid-flow-row sjs-grid-cols-1 md:sjs-grid-cols-2 lg:sjs-grid-cols-3'
            }
          >
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
  )
}

export default BenefitsOne

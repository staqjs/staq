import React from 'react'

function BenefitsBox(props) {
  const { MiniTitle, Title, Message } = props

  return (
    <div className={'sjs-bg-white sjs-rounded-md shadow sjs-m-2 sjs-p-2'}>
      <p className={'sjs-text-gray-400'}>{MiniTitle}</p>
      <p className={'sjs-font-medium'}>{Title}</p>
      <p className={''}>{Message}</p>
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
                key={benefit.MiniTitle}
                miniTitle={benefit.MiniTitle}
                title={benefit.Title}
                message={benefit.Message}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BenefitsOne

import React from 'react'

function BenefitsBox(props) {
  const { MiniTitle, Title, Message } = props

  return (
    <div className={'sjs-bg-secondary sjs-rounded-3xl sjs-shadow-md sjs-p-8'}>
      <p className={'sjs-text-gray-300 sjs-mb-8'}>{MiniTitle}</p>
      <p className={'sjs-font-medium sjs-text-xl sjs-text-gray-300'}>{Title}</p>
      <p className={'sjs-text-xl sjs-text-gray-400'}>{Message}</p>
    </div>
  )
}

function BenefitsTwo(props) {
  const { Benefits, Subtitle, Title } = props

  return (
    <div className={'sjs-flex sjs-justify-center sjs-py-16 sjs-bg-gray-900'}>
      <div className={'sjs-max-w-screen-lg'}>
        <div className={'sjs-px-4 sjs-flex sjs-flex-col sjs-items-center'}>
          <div
            className={'sjs-text-center sjs-text-white sjs-text-5xl sjs-mb-4'}
          >
            {Title}
          </div>
          <div
            className={
              'sjs-text-center sjs-text-gray-400 sjs-mb-8 sjs-max-w-sm'
            }
          >
            {Subtitle}
          </div>
          <div
            className={
              'sjs-grid sjs-grid-flow-row sjs-grid-cols-1 lg:sjs-grid-cols-3 gap-4'
            }
          >
            {Benefits.map((benefit) => (
              <BenefitsBox key={benefit.MiniTitle} {...benefit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BenefitsTwo

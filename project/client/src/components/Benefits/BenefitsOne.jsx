import React from 'react'

function BenefitsBox(props) {
  const { miniTitle, title, message } = props

  return (
    <div className={'bg-white rounded-md shadow m-2 p-2'}>
      <p className={'text-gray-400'}>{miniTitle}</p>
      <p className={'font-medium'}>{title}</p>
      <p className={''}>{message}</p>
    </div>
  )
}

function BenefitsOne(props) {
  const { Benefits } = props

  return (
    <div className={'flex justify-center py-16'}>
      <div className={'max-w-screen-xl'}>
        <div className={'px-4'}>
          <div className={'grid grid-flow-row grid-cols-2 lg:grid-cols-3'}>
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

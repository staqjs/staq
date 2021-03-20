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

function BenefitsThree(props) {
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
              'sjs-grid sjs-grid-rows-3 md:sjs-grid-cols-1 md:sjs-grid-cols-2 sjs-gap-4'
            }
          >
            <div
              className={
                'sjs-bg-secondary sjs-rounded-3xl sjs-shadow-md sjs-pl-8 sjs-pt-8 md:sjs-col-start-1 md:sjs-col-end-3'
              }
            >
              <div
                className={
                  'sjs-flex sjs-flex-col sjs-justify-between sjs-h-full md:sjs-flex-row'
                }
              >
                <div className={'sjs-text-left sjs-mr-12 sjs-mb-4'}>
                  <p className={'sjs-text-gray-300 sjs-mb-8'}>
                    {Benefits[0].MiniTitle}
                  </p>
                  <p
                    className={'sjs-font-medium sjs-text-xl sjs-text-gray-300'}
                  >
                    {Benefits[0].Title}
                  </p>
                  <p className={'sjs-text-xl sjs-text-gray-400'}>
                    {Benefits[0].Message}
                  </p>
                </div>

                <img
                  src={Benefits[0].Image}
                  className={
                    'sjs-object-contain sjs-self-end sjs-rounded-md sjs-rounded-bl-none sjs-rounded-tr-none'
                  }
                />
              </div>
            </div>

            <div
              className={
                'sjs-bg-secondary sjs-rounded-3xl sjs-shadow-md md:sjs-p-8 md:sjs-col-start-1 md:sjs-col-end-1'
              }
            >
              <div
                className={
                  'sjs-flex sjs-flex-col sjs-justify-between sjs-h-full'
                }
              >
                <div className={'sjs-text-left sjs-p-8 sjs-mr-12 sjs-mb-auto'}>
                  <p className={'sjs-text-gray-300 sjs-mb-8'}>
                    {Benefits[0].MiniTitle}
                  </p>
                  <p
                    className={'sjs-font-medium sjs-text-xl sjs-text-gray-300'}
                  >
                    {Benefits[1].Title}
                  </p>
                  <p className={'sjs-text-xl sjs-text-gray-400'}>
                    {Benefits[1].Message}
                  </p>
                </div>

                <img
                  src={Benefits[1].Image}
                  className={
                    'sjs-object-contain sjs-rounded-bl-md sjs-rounded-br-md md:sjs-rounded-md'
                  }
                />
              </div>
            </div>

            <div
              className={
                'sjs-bg-secondary sjs-rounded-3xl sjs-shadow-md md:sjs-p-8 md:sjs-col-start-2 md:sjs-col-end-2'
              }
            >
              <div
                className={
                  'sjs-flex sjs-flex-col sjs-justify-between sjs-h-full'
                }
              >
                <img
                  src={Benefits[2].Image}
                  className={
                    'sjs-object-contain sjs-rounded-tl-md sjs-rounded-tr-md md:sjs-rounded-md'
                  }
                />

                <div className={'sjs-text-left sjs-p-8 sjs-mr-12'}>
                  <p className={'sjs-text-gray-300 sjs-mb-8'}>
                    {Benefits[2].MiniTitle}
                  </p>
                  <p
                    className={'sjs-font-medium sjs-text-xl sjs-text-gray-300'}
                  >
                    {Benefits[2].Title}
                  </p>
                  <p className={'sjs-text-xl sjs-text-gray-400'}>
                    {Benefits[2].Message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BenefitsThree

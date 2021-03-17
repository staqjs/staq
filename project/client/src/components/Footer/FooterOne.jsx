import React from 'react'
import { Link } from 'react-router-dom'
import { Portal } from 'react-portal'
import _ from 'lodash'

function FooterColumn(props) {
  const { Title, Links } = props

  return (
    <div className={'sjs-px-4'}>
      <div className={'sjs-text-white sjs-text-contrast sjs-font-bold'}>
        {Title}
      </div>
      <div className={'sjs-flex sjs-flex-col'}>
        {Links.map((link) => {
          return _.startsWith(link, '/') ? (
            <Link
              key={link.To}
              to={link.To}
              className={'sjs-text-white sjs-text-contrast sjs-text-sm'}
            >
              {link.Text}
            </Link>
          ) : (
            <a
              key={link.To}
              href={link.To}
              className={'sjs-text-white sjs-text-contrast sjs-text-sm'}
            >
              {' '}
              {link.Text}{' '}
            </a>
          )
        })}
      </div>
    </div>
  )
}

function PoweredByStaqLabel() {
  return (
    <div className={''}>
      <a
        href="https://staqjs.com"
        className={'sjs-text-sm sjs-text-white sjs-text-contrast'}
      >
        <span className={''}>Powered by</span>
        <span className={'sjs-ml-1 sjs-font-bold'}>staqjs</span>
      </a>
    </div>
  )
}

function FooterOne(props) {
  const { Columns, Copyright, PoweredByStaq } = props

  return (
    <Portal>
      <div
        className={
          'sjs-h-96 sjs-px-6 sjs-py-4 sjs-bg-primary sjs-flex sjs-flex-col sjs-justify-between sjs-items-center'
        }
      >
        <div className={'sjs-flex'}>
          {Columns.map((column) => (
            <FooterColumn
              key={column.Title}
              Title={column.Title}
              Links={column.Links}
            />
          ))}
        </div>

        <div className={'sjs-w-full sjs-flex sjs-justify-between'}>
          <div className={''}>
            <span className={'sjs-text-sm sjs-text-white sjs-text-contrast'}>
              &copy; {Copyright}
            </span>
          </div>

          {PoweredByStaq || false ? <PoweredByStaqLabel /> : null}
        </div>
      </div>
    </Portal>
  )
}

export default FooterOne

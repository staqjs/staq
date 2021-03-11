import React from 'react'
import { Link } from 'react-router-dom'
import { Portal } from 'react-portal'
import _ from 'lodash'

function FooterColumn(props) {
  const { title, links } = props

  return (
    <div className={'sjs-px-4'}>
      <div className={'sjs-text-white sjs-text-contrast sjs-font-bold'}>
        {title}
      </div>
      <div className={'sjs-flex sjs-flex-col'}>
        {links.map((link) => {
          return _.startsWith(link, '/') ? (
            <Link
              key={link.link}
              to={link.link}
              className={'sjs-text-white sjs-text-contrast sjs-text-sm'}
            >
              {link.text}
            </Link>
          ) : (
            <a
              key={link.link}
              href={link.link}
              className={'sjs-text-white sjs-text-contrast sjs-text-sm'}
            >
              {' '}
              {link.text}{' '}
            </a>
          )
        })}
      </div>
    </div>
  )
}

function PoweredByStaq() {
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
  const { columns, copyright, poweredByStaq } = props

  return (
    <Portal>
      <div
        className={
          'sjs-h-96 sjs-px-6 sjs-py-4 sjs-bg-primary sjs-flex sjs-flex-col sjs-justify-between sjs-items-center'
        }
      >
        <div className={'sjs-flex'}>
          {columns.map((column) => {
            return (
              <FooterColumn
                key={column.title}
                title={column.title}
                links={column.links}
              />
            )
          })}
        </div>

        <div className={'sjs-w-full sjs-flex sjs-justify-between'}>
          <div className={''}>
            <span className={'sjs-text-sm sjs-text-white sjs-text-contrast'}>
              &copy; {copyright}
            </span>
          </div>

          {poweredByStaq || false ? <PoweredByStaq /> : null}
        </div>
      </div>
    </Portal>
  )
}

export default FooterOne

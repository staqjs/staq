import React from 'react'
import { Link } from 'react-router-dom'
import { Portal } from 'react-portal'
import _ from 'lodash'

function FooterColumn(props) {
  const { title, links } = props

  return (
    <div className={'px-4'}>
      <div className={'text-white font-bold'}>{title}</div>
      <div className={'flex flex-col'}>
        {links.map((link) => {
          return _.startsWith(link, '/') ? (
            <Link
              key={link.link}
              to={link.link}
              className={'text-white text-sm'}
            >
              {link.text}
            </Link>
          ) : (
            <a
              key={link.link}
              href={link.link}
              className={'text-white text-sm'}
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
      <a href="https://staqjs.com" className={'text-sm text-white'}>
        <span className={''}>Powered by</span>
        <span className={'ml-1 font-bold'}>staqjs</span>
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
          'h-96 px-6 py-4 bg-blue-400 flex flex-col justify-between items-center'
        }
      >
        <div className={'flex'}>
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

        <div className={'w-full flex justify-between'}>
          <div className={''}>
            <span className={'text-sm text-white'}>&copy; {copyright}</span>
          </div>

          {poweredByStaq || false ? <PoweredByStaq /> : null}
        </div>
      </div>
    </Portal>
  )
}

export default FooterOne

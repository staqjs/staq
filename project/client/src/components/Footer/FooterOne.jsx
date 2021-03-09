import React from 'react'
import { Link } from 'react-router-dom'
import { Portal } from 'react-portal'
import _ from 'lodash'

function FooterColumn(props) {
  const { title, links } = props

  return (
    <div className={''}>
      <div className={''}>{title}</div>
      <div className={''}>
        {links.map((link) => {
          return _.startsWith(link, '/') ? (
            <Link key={link.link} to={link.link} className={''}>
              {link.text}
            </Link>
          ) : (
            <a key={link.link} href={link.link} className={''}>
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
      <a href="https://staqjs.com" className={''}>
        <span className={''}>Powered by</span>
        <span className={''}>staqjs</span>
      </a>
    </div>
  )
}

function FooterOne(props) {
  const { columns, copyright, poweredByStaq } = props

  return (
    <Portal>
      <div className={''}>
        <div className={''}>
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

        <div className={''}>
          <div className={''}>
            <span className={''}>&copy; {copyright}</span>
          </div>

          {poweredByStaq || false ? <PoweredByStaq /> : null}
        </div>
      </div>
    </Portal>
  )
}

export default FooterOne

import React from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  productionPrefix: 'staq',
  seed: 'staq',
})

export default function StaqStyleProvider(props) {
  const { children } = props

  return (
    <StylesProvider generateClassName={generateClassName}>
      { children }
    </StylesProvider>
  )
}

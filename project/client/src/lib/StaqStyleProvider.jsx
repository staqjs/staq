import React from 'react'
import {
  StylesProvider,
  createGenerateClassName,
  createMuiTheme
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import staqConfig from '../../../staq'

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  productionPrefix: 'staq',
  seed: 'staq'
})

const defaultTheme = createMuiTheme()

export default function StaqStyleProvider(props) {
  const { children } = props
  const theme = staqConfig.get('theme') || defaultTheme

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider generateClassName={generateClassName}>
        {children}
      </StylesProvider>
    </ThemeProvider>
  )
}

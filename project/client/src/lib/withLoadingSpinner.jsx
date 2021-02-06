import React from 'react'
import { CircularProgress } from '@material-ui/core'

export function withLoadingSpinner(component, isLoading) {
  console.log(component)
  return function () {
    return isLoading ? <CircularProgress /> : component
  }
}

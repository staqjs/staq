import React from 'react'
import { CgSpinner } from 'react-icons/cg'

export function withLoadingSpinner(component, isLoading) {
  return function () {
    return isLoading ? (
      <CgSpinner className={'sjs-animate-spin sjs-w-full sjs-h-full'} />
    ) : (
      component
    )
  }
}

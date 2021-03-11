import React from 'react'
import { CgSpinner } from 'react-icons/cg'

export function withLoadingSpinner(component, isLoading) {
  return function () {
    return isLoading ? (
      <CgSpinner className={'animate-spin w-full h-full'} />
    ) : (
      component
    )
  }
}

import React from 'react'

export function withLoadingSpinner(component, isLoading) {
  return function () {
    return isLoading ? component : component
  }
}

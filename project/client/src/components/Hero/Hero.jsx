import React from 'react'
import HeroOne from './HeroOne'

const getHeroComponent = (templateName) => {
  if (templateName === 'One') {
    return HeroOne
  }

  return HeroOne
}

function Hero(props) {
  const { templateName } = props
  const HeroComponent = getHeroComponent(templateName)

  return <HeroComponent {...props} />
}

export default Hero

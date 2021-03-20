import React from 'react'
import HeroOne from './HeroOne'
import HeroTwo from './HeroTwo'

const getHeroComponent = (templateName) => {
  if (templateName === 'One') {
    return HeroOne
  } else if (templateName === 'Two') {
    return HeroTwo
  }

  return HeroOne
}

function Hero(props) {
  const { templateName } = props
  const HeroComponent = getHeroComponent(templateName)

  return <HeroComponent {...props} />
}

export default Hero

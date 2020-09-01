import _ from 'lodash'

class StaqConfig {
  constructor() {
    this.config = {}
  }

  setConfig(config) {
    this.config = config
  }

  get(field) {
    return _.get(this.config, field)
  }

  set(field, value) {
    this.config[field] = value
  }
}

const staqConfig = new StaqConfig()

export const initStaq = (config) => {
  staqConfig.config = config
}

export default staqConfig
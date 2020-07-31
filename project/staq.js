class StaqConfig {
  constructor() {
    this.config = {}
  }

  setConfig(config) {
    this.config = config
  }

  get(field) {
    return this.config[field]
  }
}

const staqConfig = new StaqConfig()

export const initStaq = (config) => {
  staqConfig.config = config
}

export default staqConfig

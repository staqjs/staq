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

export default new StaqConfig()

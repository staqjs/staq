import _ from 'lodash'
import {createMuiTheme} from '@material-ui/core/styles'

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
}

const staqConfig = new StaqConfig()

export const initStaq = (config) => {
  const defaultTheme = createMuiTheme()
  const theme = staqConfig.get('theme') || defaultTheme
  staqConfig.config = config
}

export default staqConfig

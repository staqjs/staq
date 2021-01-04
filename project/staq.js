// Define this so we don't need to use lodash
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
const _get = (obj, path, defaultValue = undefined) => {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

class StaqConfig {
  constructor() {
    this.config = {};
  }

  setConfig(config) {
    this.config = config;
  }

  get(field, dflt) {
    return _get(this.config, field, dflt);
  }

  set(field, value) {
    this.config[field] = value;
  }
}

const staqConfig = new StaqConfig();

export const initStaq = (config) => {
  staqConfig.config = config;
};

export default staqConfig;

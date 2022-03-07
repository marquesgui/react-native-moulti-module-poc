const fs = require('fs');
const {Logger} = require('../utils/Logger');

const newPath = `${__dirname}/../../../../../../metro.config.js`;
const oldPath = `${__dirname}/../../../../../../rn-cli.config.js`;

class RNCLIConfigValidator {
  run() {
    this._generateConfigIfDoesNotExist();
    this._validateNoDeprecatedConfig();
  }

  _generateConfigIfDoesNotExist() {
    if (!fs.existsSync(newPath)) {
      fs.writeFileSync(newPath, `\
// This file was generated by react-native-wix-engine on ${new Date().toDateString()}
// You can extend it if you want, but leave the defaults to be required from the engine config

module.exports = {
  ...require('./node_modules/react-native-wix-engine/tools/engine_cli/etc/metro.config')
};
`);
    }
  }

  _validateNoDeprecatedConfig() {
    if (fs.existsSync(oldPath)) {
      Logger.error(`
Discovered rn-cli.config.js file in your project. react-native switched to metro.config.js,
so rn-cli.config.js is not in use anymore. Please move your custom settings to metro.config.js
and remove rn-cli.config.js
`);
      process.exit(1);
    }
  }

}

module.exports = {RNCLIConfigValidator};

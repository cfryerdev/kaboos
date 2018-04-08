var utils = require('../common/utils');

module.exports = {
    setValue: function (envName, envValue) {
      if (!utils.isDefined(process.env[envName]) || (utils.isDefined(process.env[envName]) && process.env[envName] == '')) {
        process.env[envName] = envValue;
      }
    }
};

var express = require('express')
, router = express.Router()
, utils = require('../common/utils')


module.exports = {
  validateTeam: validateTeam,

};

function validateTeam(model) {
  var errors = [];

  if (utils.isNotSet(model)) {
    errors.push({message: 'Invalid object.', type: 'validation'});
  }

  if (utils.isNotSet(model.name)) {
    errors.push({message: 'Team name is required.', type: 'validation'});
  }

  return errors;
}

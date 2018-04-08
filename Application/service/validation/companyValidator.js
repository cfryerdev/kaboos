var express = require('express')
, router = express.Router()
, utils = require('../common/utils')


module.exports = {
  validateCompany: validateCompany,

};

function validateCompany(model) {
  var errors = [];

  if (utils.isNotSet(model)) {
    errors.push({message: 'Invalid object.', type: 'validation'});
  }

  if (utils.isNotSet(model.name)) {
    errors.push({message: 'Company name is required.', type: 'validation'});
  }

  if (!utils.isNotSet(model._id) && !model.isActive) {
      errors.push({message: 'You cannot update a disabled company.', type: 'validation'});
  }

  return errors;
}

var express = require('express')
, router = express.Router()
, utils = require('../common/utils')


module.exports = {
  validateProject: [nameRequired, projectTypeRequired],

};

function validateProject(model) {
    var errors = [];

    if (utils.isNotSet(model)) {
      errors.push({message: 'Invalid object.', type: 'validation'});
    }

    if (utils.isNotSet(model.name)) {
      errors.push({message: 'Project name is required.', type: 'validation'});
    }

    if (utils.isNotSet(model.projectType)) {
      errors.push({message: 'Project Type is required.', type: 'validation'});
    }

  return errors;
}

// Name is required
// ==============================================
function nameRequired(model, res) {
	if (utils.isNotSet(model.name)) {
		var result = {message: 'Project name is required.', type: 'validation'};
	}
	res(result);
}

// ProjectType is required
// ==============================================
function projectTypeRequired(model, res) {
	if (utils.isNotSet(model.projectType)) {
		var result = {message: 'Project Type is required.', type: 'validation'}; 
	}
	res(result);
}
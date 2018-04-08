var utils = require('./utils')

// Run validation on a model
// ==========================================
function runValidation(validators, model) {
	return new Promise(function (resolve, reject) {
		
		// Array to contain promisified' validators
		var validatorPromises = [];

		// Array to hold non-null validation messages
		var validationResults = [];
		
		// Check if validators is an array
		if (Array.isArray(validators)) {
			
			// Loop over array, promisifying validators and adding each validator to validatorPromises
			validators.forEach((validator) => {
				validatorPromises.push(createValidator(validator, model));
			});
		}

		// Check if validators is an object
		else if (typeof(validators) === 'object') {
			
			// Loop over object, promisifying validators and adding each validator to validatorPromises			
			for (var validator in validators) {
				validatorPromises.push(createValidator(validators[validator], model));
			}
		}

		// Check if validators is a validator function
		else if (typeof(validators) === 'function') {

			// Promisify validator and add each it to validatorPromises
			validatorPromises.push(createValidator(validators), model);
		}

		// Run all validators in validatorPromises and return result when complete
		Promise.all(validatorPromises).then(function(result) {
			result.forEach(function(result) {
				if (utils.isDefined(result)) {
					validationResults.push(result);
				}
			})
			resolve(validationResults);
		});
	})
}

// Create a validator
// ===========================================
function createValidator(validationLogic, model) {

	// Return a promise wrapping the validation logic
    return new Promise(function (resolve, reject) {

		// Pass in the resolve and reject methods to the validation logic so they can be accessed
        validationLogic(model, resolve, reject);
    });
}

module.exports = {
	runValidation: runValidation,
	createValidator: createValidator
}
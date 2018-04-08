var utils = require('../common/utils')

module.exports = {
	createRelease: [
		companyRequired, 
		nameRequired//,
		// statusRequired
	]
}

// Company required
// ==============================================
function companyRequired (model, res) {
	if (utils.isNotSet(model.company)) {
		var result = { message: 'CompanyId is required.', type: 'validation' };
	}
	res(result);
}

// Name required
// ==============================================
function nameRequired (model, res) {
	if (utils.isNotSet(model.name)) {
		var result = { message: 'Name is required.', type: 'validation' };
	}
	res(result);
}

// Status required
// ==============================================
function statusRequired (model, res) {
	if (utils.isNotSet(model.status)) {
		var result = { message: 'Status is required.', type: 'validation' };
	}
	res(result)
}
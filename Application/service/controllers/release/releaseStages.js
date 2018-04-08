var express = require('express')
	, router = express.Router()
	, modelType = require('../../models/releaseStage')
	, manager = require('../../managers/releaseManager')
	, isAuthenticated = require('../../middlewares/auth')
	, companyAccess = require('../../middlewares/companyAccess')


// ==================================================
// COMMON ROUTES
// ==================================================

// LIST / READALL
// ==================================================
router.get('/', isAuthenticated, function (req, res) {
	return manager.getReleaseStages()
		.then(function (data) {
			res.json(data);
		})
		.catch(function (err) {
			res.status(400).json(err);
		});
});

module.exports = router;
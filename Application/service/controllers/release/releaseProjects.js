var express = require('express')
	, router = express.Router()
	, modelType = require('../../models/releaseProject')
	, manager = require('../../managers/releaseManager')
	, isAuthenticated = require('../../middlewares/auth')
	, companyAccess = require('../../middlewares/companyAccess')


// ==================================================
// COMMON ROUTES
// ==================================================

// LIST / READALL
// ==================================================
router.get('/', [isAuthenticated, companyAccess], function (req, res) {
	manager.getReleaseProjects()
		.then(function (data) {
			res.json(data);
		})
		.catch(function (err) {
			res.status(400).json(err);
		});
});


module.exports = router;
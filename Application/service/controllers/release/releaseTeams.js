var express = require('express')
	, router = express.Router()
	, modelType = require('../../models/releaseTeam')
	, manager = require('../../managers/releaseManager')
	, isAuthenticated = require('../../middlewares/auth')
	, companyAccess = require('../../middlewares/companyAccess')

// ==================================================
// COMMON ROUTES
// ==================================================

// LIST / READALL
// ==================================================
router.get('/', [isAuthenticated, companyAccess], function (req, res) {
	manager.getReleaseTeams()
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			res.status(400).json(err);
		})
})

module.exports = router;
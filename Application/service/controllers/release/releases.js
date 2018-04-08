var express = require('express')
	, router = express.Router()
	, modelType = require('../../models/release')
	, manager = require('../../managers/releaseManager')
	, isAuthenticated = require('../../middlewares/auth')
	, companyAccess = require('../../middlewares/companyAccess')


// ==================================================
// COMMON ROUTES
// ==================================================

// LIST / READALL
// ==================================================
router.get('/', [isAuthenticated, companyAccess], function (req, res) {
	manager.listReleases(req.session.user)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			res.status(400).json({ err });
		});
});

router.get('/statuses', [isAuthenticated], function (req, res) {
	manager.listStatuses()
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			res.status(400).json({ err });
		});
});

router.get('/stages', [isAuthenticated], function (req, res) {
	manager.listStages()
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			res.status(400).json({ err });
		});
});

// READ / GET
// ==================================================
router.get('/:id', [isAuthenticated, companyAccess], function (req, res) {
	manager.getRelease(req.params.id)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			res.status(400).json({ err });
		});
});

router.get('/:id/teams', [isAuthenticated, companyAccess], function (req, res) {
	manager.getTeamsByReleaseId(req.params.id)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			res.status(400).json({ err });
		});
});

router.get('/:id/projects', [isAuthenticated, companyAccess], function (req, res) {
	manager.getProjectsByReleaseId(req.params.id)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			res.status(400).json({ err });
		});
})

router.get('/:id/members', [isAuthenticated, companyAccess], function (req, res) {
	manager.getMembersByReleaseId(req.params.id)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			res.status(400).json({ err });
		});
});

// SAVE / CREATE / UPDATE
// ==================================================
router.post('/', [isAuthenticated, companyAccess], function (req, res) {
	manager.saveRelease(req.body)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			res.status(400).json({ err });
		});
});

// DELETE / REMOVE
// ==================================================
router.delete('/:id', [isAuthenticated, companyAccess], function (req, res) {
	manager.deleteRelease(req.params.id)
		.then(function (results) {
			res.json(results);
		})
		.catch(function (err) {
			res.status(400).json({ err });
		});
});

// ==================================================
module.exports = router;

var express = require('express')
  , router = express.Router()
  , manager = require('../managers/notificationManager')
  , utils = require('../common/utils')
  , isAuthenticated = require('../middlewares/auth')
  , companyAccess = require('../middlewares/companyAccess');


// ==================================================
// ROUTES
// ==================================================

router.get('/', isAuthenticated, function (req, res) {
	 manager.list(res, req.session.user);
});

router.get('/:id/markRead', isAuthenticated, function (req, res) {
	 manager.markRead(res, req.session.user, req.params.id);
});

router.get('/:id/markUnread', isAuthenticated, function (req, res) {
	 manager.markUnread(res, req.session.user, req.params.id);
});

router.get('/:id/markViewed', isAuthenticated, function (req, res) {
	 manager.markViewed(res, req.session.user, req.params.id);
});

// ==================================================
module.exports = router;

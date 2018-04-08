var express = require('express')
	, router = express.Router()
	, companyMemberSchema = require('../models/companyMember')
	, session = require('express-session')
	, companyManager = require('../managers/companyManager');

var _noAccessMessage =  'You do not have access to this resource';

router.use('/:companyId', function (req, res, next) {

	// DISABLED
	return next();

	// Parse and check for companyId
	var companyId = '';
	if (req.params && req.params.companyId && req.params.companyId != '') {
		companyId = req.params.companyId;
	}
	else if (req.body && req.body.companyId && req.body.companyId != '') {
		companyId = req.body.companyId;
	}
	else if (req.body && req.body.company && req.body.company._id) {
		companyId = req.params.company._id;
	}

	// Are we authenticated?
	var isAuthenticated = (req.session && req.session.user && req.session.user.isAuthenticated);

	// If we have a companyId and we are authenticated lets check access.
	if(isAuthenticated && companyId != '')
	{
		companyManager.checkAccess(companyId, req.session.user._id, function(data) {
			if (data) {
				// Move along, all good here.
				return next();
			}
			else {
				// Nope, denied.
				res.status(403).send({message: _noAccessMessage, type: 'authentication'});
			}
		});
	}
	else {
		// Nope, denied.
		res.status(403).send({message: _noAccessMessage, type: 'authentication'});
	}
});

module.exports = router;

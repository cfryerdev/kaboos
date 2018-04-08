var express = require('express')
  , router = express.Router()
  , modelType = require('../models/userProfile')
  , profileValidator = require('../validation/userProfileValidator')
  , userProfileInviteSchema = require('../models/userProfileInvite')
  , userProfileInviteStatusSchema = require('../models/userProfileInviteStatus')
  , userProfilePrefsSchema = require('../models/userProfilePrefs')
  , companySchema = require('../models/company')
  , memberSchema = require('../models/companyMember')
  , companyManager = require('../managers/companyManager')
  , userProfileManager = require('../managers/userProfileManager')
  , utils = require('../common/utils')
  , mapper = require('../common/mapper')
  , isAuthenticated = require('../middlewares/auth')
  , Repository = require('../common/repository')
  , emailManager = require('../managers/emailManager')
	, userProfileNotificationSchema = require('../models/userProfileNotification')
  , crypto = require('crypto');

var repo = new Repository(modelType);
var companyRepo = new Repository(companySchema);
var companyMemberRepo = new Repository(memberSchema);
var userProfileInviteRepo = new Repository(userProfileInviteSchema);
var userProfilePrefsRepo = new Repository(userProfilePrefsSchema);

var hasher = function (password) {
	return crypto.createHash('sha1').update(password).digest('base64');
}

// LOGIN
// ==================================================
router.post('/login', function (req, res) {
	if (!utils.isDefined(req.body.emailAddress) || !utils.isDefined(req.body.password) || req.body.emailAddress == '' || req.body.password == '') {
		utils.buildError(400, res, { message: 'A valid Username and password are required.', type: 'validation' });
		return;
	}
	repo.filter({ $and: [{ emailAddress: req.body.emailAddress }, { password: hasher(req.body.password) }] }, function (err, item) {
		if (err || item.length == 0) {
			utils.buildError(400, res, { message: 'Username and password combination failed.', type: 'validation' });
		}
		else {
			var model = item[0];
			req.session.user = {
				_id: model._id,
				emailAddress: model.emailAddress,
				isAuthenticated: true,
			};
			res.json({ message: 'Login Successful.' });
		}
	});
});

// ACCOUNT STATUS
// ==================================================
router.get('/status', function (req, res) {
  var isUserLoggedIn =  (req.session && req.session.user && req.session.user.isAuthenticated);
  if (isUserLoggedIn) {

    userProfileInviteSchema.find({ userProfile: req.session.user._id})
    .populate('status', 'name')
    .exec(function(err, invites) {
      var pendingInvites = invites.filter(function(a) {
          if (a.status.name == 'Pending') {
            return a;
          }
      });

      res.json({
        isLoggedIn: isUserLoggedIn,
        notificationCount: 0,
        inviteCount: pendingInvites.length
      });
    });

  }
  else {
    res.json({
  		isLoggedIn: false,
      inviteCount: 0
  	});
  }

});

// LOGOUT
// ==================================================
router.get('/logout', function (req, res) {
	if (req.session) {
		req.session.destroy();
	}
	res.json({ message: 'Logout Successful.' });
});

// REGISTER
// ==================================================
router.post('/register', function (req, res) {
	userProfileManager.register(req.body)
		.then(function (results) {
			req.session.user = {
				_id: results._id,
				displayName: results.displayName,
				emailAddress: results.emailAddress,
				isAuthenticated: true,
			};
			return res.json(results);
		})
		.catch(function (results) {
			return res.status(400).send({ messages: results, type: 'validation' });
		});
});

// CHANGE PASSWORD
// ==================================================
router.post('/changePassword', isAuthenticated, function (req, res) {
	if (!utils.isDefined(req.body.currentPassword) || !utils.isDefined(req.body.newPassword) || !utils.isDefined(req.body.confirmPassword)) {
		utils.buildError(400, res, { message: 'You must supply valid password data.', type: 'validation' });
	}
	else if (req.body.newPassword != req.body.confirmPassword) {
		utils.buildError(400, res, { message: 'You must supply valid password data.', type: 'validation' });
	}
	else {
		repo.filter({ $and: [{ emailAddress: req.session.user.emailAddress }, { password: hasher(req.body.currentPassword) }] }, function (err, item) {
			if (err || item.length == 0) {
				utils.buildError(400, res, { message: 'Username and password combination failed.', type: 'validation' });
			}
			else {
				var model = item[0];
				model.password = hasher(req.body.newPassword);
				repo.update(model, function (err, updatedModel) {
					res.json({ message: 'Password Reset Successful.' });
				});
			}
		});
	}
});

// FORGOT PASSWORD
// ==================================================
router.post('/forgotPassword', isAuthenticated, function (req, res) {

});


// READ / GET
// ==================================================
router.get('/', isAuthenticated, function (req, res) {
	if (!utils.isDefined(req.session) || !utils.isDefined(req.session.user) || !utils.isDefined(req.session.user._id)) {
		utils.buildError(401, res, { message: 'You are not authorized to view this.', type: 'authentication' });
	}
	else {
		repo.read(req.session.user._id, function (err, item) {
			repo.handleResponse(res, err, item);
		});
	}
});

router.get('/prefs', isAuthenticated, function (req, res) {
    if (!utils.isDefined(req.session) || !utils.isDefined(req.session.user) || !utils.isDefined(req.session.user._id)) {
      utils.buildError(401, res, { message: 'You are not authorized to view this.', type: 'authentication' });
    }
    else {
      userProfilePrefsRepo.filter({ userProfile: req.session.user._id }, function (err, data) {
          if (utils.isDefined(data) && data != null && data.length > 0) {
            userProfilePrefsRepo.handleResponse(res, err, data[0]);
          }
          else {
            var model = {
                userProfile: req.session.user._id,
                allowEmailExposed: false,
                allowEmailNotifications: false,
                allowInAppNotifications: false,
                showInactiveRecords: false,
            };
            userProfilePrefsRepo.handleResponse(res, err, model);
          }
      });
    }
});

router.get('/invites', isAuthenticated, function (req, res) {
	if (!utils.isDefined(req.session) || !utils.isDefined(req.session.user) || !utils.isDefined(req.session.user._id)) {
		utils.buildError(401, res, { message: 'You are not authorized to view this.', type: 'authentication' });
	}
	else {
		userProfileInviteSchema.find({ userProfile: req.session.user._id })
			.populate('company')
			.populate('status', 'name')
			.populate('companyMemberType', 'name')
			.exec(function (err, data) {
				userProfileInviteRepo.handleResponse(res, err, data);
			});
	}
});

// SAVE / UPDATE
// ==================================================

router.post('/', isAuthenticated, function (req, res) {
	var errors = profileValidator.validateUserProfile(req.body);
	if (errors.length > 0) {
		res.status(400).send({ messages: errors });
	}
	else {
		repo.update(req.body, function (err, item) {
			repo.handleResponse(res, err, item);
		});
	}
});

router.post('/prefs', isAuthenticated, function (req, res) {
	if (req.body.userProfile == undefined || req.body.userProfile == '') {
		utils.buildError(400, res, { message: 'Unable to update prefs.', type: 'validation' });
	}
	else {
		userProfilePrefsSchema.remove({ userProfile: req.session.user._id }, function (err, item) {
			userProfilePrefsSchema.create(req.body, function (err, item) {
				repo.handleResponse(res, err, item);
			});
		});
	}
});

router.get('/invites/accept/:id', isAuthenticated, function (req, res) {
	if (req.params.id == undefined || req.params.id == '') {
		utils.buildError(400, res, { message: 'Unable to update invite.', type: 'validation' });
	}
	else {
		userProfileManager.acceptInvite(req.params.id, function (err, item) {
			repo.handleResponse(res, err, item);
		});
	}
});

router.get('/invites/decline/:id', isAuthenticated, function (req, res) {
	if (req.params.id == undefined || req.params.id == '') {
		utils.buildError(400, res, { message: 'Unable to update invite.', type: 'validation' });
	}
	else {
		userProfileManager.declineInvite(req.params.id, function (err, item) {
			repo.handleResponse(res, err, item);
		});
	}
});

function saveInvite(inviteRecord, res) {
	userProfileInviteRepo.update(inviteRecord, function (err, item) {
		repo.handleResponse(res, err, item);
	});
}

// CUSTOM ROUTES
// ==================================================

router.get('/companies', isAuthenticated, function (req, res) {
	memberSchema.find({ userProfile: req.session.user._id })
		.populate('company')
		.exec(function (err, item) {
			var companies = item.map(function (a) { return a.company; });
			repo.handleResponse(res, err, companies);
		});
});

// CONVERT BODY TO MODEL
// ==================================================
function buildModelFromBody(body) {
	var model = new modelType();
	return mapper.map(body, model, null);
}



module.exports = router;

var express = require('express')
  , router = express.Router()
  , modelType = require('../../models/company')
  , companyValidator = require('../../validation/companyValidator')
  , projectSchema = require('../../models/project')
  , teamSchema = require('../../models/team')
  , memberSchema = require('../../models/companyMember')
  , userProfileManager = require('../../managers/userProfileManager')
  , companyManager = require('../../managers/companyManager')
  , companyMemberManager = require('../../managers/companyMemberManager')
  , shortid = require('shortid')
  , utils = require('../../common/utils')
  , mapper = require('../../common/mapper')
  , isAuthenticated = require('../../middlewares/auth')
  , Repository = require('../../common/repository')
  , companyAccess = require('../../middlewares/companyAccess');

var repo = new Repository(modelType);
var projRepo = new Repository(projectSchema);
var teamRepo = new Repository(teamSchema);
var memberRepo = new Repository(memberSchema);


// ==================================================
// COMMON ROUTES
// ==================================================

// LIST / READALL
// ==================================================
router.get('/', isAuthenticated, function (req, res) {
	memberSchema.find({ userProfile: req.session.user._id })
  	.populate('company')
  	.populate('companyMemberType', 'name')
  	.exec(function (err, item) {
      var companies = item.map(function(a) {
          if (a.company != null) {
            var model = a.company.toObject();
            model['companyMemberType'] = a.companyMemberType;
            return model;
          }
      });

  		res.json(companies);
  	});
});

// GENERATE ID
// ==================================================
router.get('/getid', isAuthenticated, function (req, res) {
    repo.handleResponse(res, null, { code: shortid.generate() });
});

// READ / GET
// ==================================================
router.get('/:companyId', [isAuthenticated, companyAccess], function (req, res) {
    repo.read(req.params.companyId, function (err, item) {
        repo.handleResponse(res, err, item);
    });
});

// SAVE / CREATE / UPDATE
// ==================================================
router.post('/', isAuthenticated, function (req, res) {
    var errors = companyValidator.validateCompany(req.body);
    if (errors.length > 0) {
        res.status(400).send({messages: errors});
    }
    else {
      if (req.body._id == undefined || req.body._id == '') {
          companyManager.createCompany(req.session.user._id, req.body.name, function (err, item) {
            repo.handleResponse(res, err, item);
          });
      }
      else {
          repo.update(req.body, function (err, item) {
              repo.handleResponse(res, err, item);
          });
      }
    }
});

// INVITES
// ==================================================
router.post('/invite', isAuthenticated, function (req, res) {
  	// Will take in company and userEmail
  	// Will always be 200 unless missing fields (validation)
  	// Will return generic success message ('If this email address is shown to be valid, an invite will be created. Thanks')
  	userProfileManager.createInvite(req.body.emailAddress, req.body.companyMemberType, req.body.companyId, function (req, data) {
        repo.handleResponse(res, null, data);
    });
});

// DELETE / REMOVE
// ==================================================
router.delete('/:companyId', isAuthenticated, function (req, res) {
    companyManager.deleteCompany(req.params.companyId);
});

// CONVERT BODY TO MODEL
// ==================================================
function buildModelFromBody(body) {
    var model = new modelType();
    if (body._id != undefined && body._id != '') {
        model._id = body._id;
    }

    return mapper.map(body, model);
}

// ==================================================
// CUSTOM ROUTES
// ==================================================

router.get('/:companyId/projects', [isAuthenticated, companyAccess], function (req, res) {
    projectSchema.find({ company: req.params.companyId })
    	.populate('projectType', 'name')
    	.exec(function (err, item) {
        projRepo.handleResponse(res, err, item);
    });
});

router.get('/:companyId/teams', [isAuthenticated, companyAccess], function (req, res) {
    teamRepo.filter({ company: req.params.companyId }, function (err, item) {
        teamRepo.handleResponse(res, err, item);
    });
});

router.get('/:companyId/members', [isAuthenticated, companyAccess], function (req, res) {
    memberSchema.find({ company: req.params.companyId })
    	.populate('userProfile')
    	.populate('companyMemberType', 'name')
    	.exec(function (err, item) {
            memberRepo.handleResponse(res, err, item);
        });
});


// ==================================================
module.exports = router;

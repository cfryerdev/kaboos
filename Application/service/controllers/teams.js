var express = require('express')
  , router = express.Router()
  , modelType = require('../models/team')
  , teamValidator = require('../validation/teamValidator')
  , teamMemberSchema = require('../models/teamMember')
  , teamProjectSchema = require('../models/teamProject')
  , utils = require('../common/utils')
  , mapper = require('../common/mapper')
  , isAuthenticated = require('../middlewares/auth')
  , Repository = require('../common/repository')
  , companyAccess = require('../middlewares/companyAccess');

var repo = new Repository(modelType);
var teamMemberRepo = new Repository(teamMemberSchema);
var teamProject = new Repository(teamProjectSchema);

// ==================================================
// COMMON ROUTES
// ==================================================


// LIST / READALL
// ==================================================
router.get('/', [isAuthenticated, companyAccess], function (req, res) {
    repo.list(function (err, collection) {
        repo.handleResponse(res, err, collection);
    });
});

// READ / GET
// ==================================================
router.get('/:id', [isAuthenticated, companyAccess], function (req, res) {
    repo.read(req.params.id, function (err, item) {
        repo.handleResponse(res, err, item);
    });
});

// SAVE / CREATE / UPDATE
// ==================================================
router.post('/', [isAuthenticated, companyAccess], function (req, res) {
    var errors = teamValidator.validateTeam(req.body);
    if (errors.length > 0) {
        res.status(400).send({messages: errors});
    }
    else {
      repo.update(req.body, function (err, item) {
          repo.handleResponse(res, err, item);
      });
    }
});

// DELETE / REMOVE
// ==================================================
router.delete('/:id', [isAuthenticated, companyAccess], function (req, res) {
    repo.delete(req.params.id, function (err, item) {
        repo.handleResponse(res, err, { message: 'Record deleted!' });
    });
});

// CONVERT BODY TO MODEL
// ==================================================
function buildModelFromBody(body) {
    var model = new modelType();
    if (body._id != undefined && body._id != '') {
        model._id = body._id;
    }
    return mapper.map(body, model, {'companyId': 'company'});
}


// ==================================================
// CUSTOM ROUTES
// ==================================================


router.get('/:id/members', isAuthenticated, function (req, res) {
    teamMemberSchema.find({ team: req.params.id })
    // .populate('companyMember')
    // .populate('companyMember.userProfile')
    .populate({
      path: 'companyMember',
      populate: { path: 'userProfile' }
    })
    .exec(function (err, item) {
        teamMemberRepo.handleResponse(res, err, item);
    });
});

router.post('/:id/members/', isAuthenticated, function (req, res) {
  var model = new teamMemberSchema();
  model.team = req.params.team;
  model.companyMember = req.body.companyMember;
  model.save(function (err, item) {
      repo.handleResponse(res, err, { message: 'Record Created!' });
  });
});

router.delete('/:id/members/:memberId', isAuthenticated, function (req, res) {
  teamMemberSchema.delete(req.params.memberId, function (err, item) {
      repo.handleResponse(res, err, { message: 'Record deleted!' });
  });
});

router.get('/:id/projects', isAuthenticated, function (req, res) {
    teamProjectSchema.find({ team: req.params.id })
        .populate('project')
        .exec(function (err, data) {
            teamProject.handleResponse(res, err, data);
        });
});


// ==================================================
module.exports = router;

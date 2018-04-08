var express = require('express')
  , router = express.Router()
  , modelType = require('../models/project')
  , projectValidator = require('../validation/projectValidator')
  , projDepSchema = require('../models/projectDependency')
  , teamProjSchema = require('../models/teamProject')
  , utils = require('../common/utils')
  , mapper = require('../common/mapper')
  , projectsMap = require('../mappers/projects')
  , isAuthenticated = require('../middlewares/auth')
  , Repository = require('../common/repository')
  , companyAccess = require('../middlewares/companyAccess')
  , validationManager = require('../common/validationManager');

var repo = new Repository(modelType);
var projDepRepo = new Repository(projDepSchema);

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
    validationManager.runValidation(projectValidator.validateProject, req.body).then(function(results) {
		if (results.length > 0) {
			res.status(400).send({messages: errors});
		}
		else {
      if (req.body._id == undefined || req.body._id == '') {
          repo.insert(buildModelFromBody(req.body), function (err, item) {
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
	// var errors = projectValidator.validateProject(req.body);
    // if (errors.length > 0) {
    //     res.status(400).send({messages: errors});
    // }
    // else {
    //   repo.update(req.body, function (err, item) {
    //       repo.handleResponse(res, err, item);
    //   });
    // }
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
    return mapper.map(body, model, projectsMap);
}


// ==================================================
// CUSTOM ROUTES
// ==================================================


router.get('/:id/parents', isAuthenticated, function (req, res) {
    projDepSchema.find({ projectChild: req.params.id })
        .populate('projectParent', 'name')
        .populate('projectChild', 'name')
        .exec(function (err, data) {
            projDepRepo.handleResponse(res, err, data);
        });
});

router.get('/:id/children', isAuthenticated, function (req, res) {
    projDepSchema.find({ projectParent: req.params.id })
        .populate('projectParent', 'name')
        .populate('projectChild', 'name')
        .exec(function (err, data) {
            projDepRepo.handleResponse(res, err, data);
        });
});

router.get('/:id/teams', isAuthenticated, function (req, res) {
    teamProjSchema.find({ project: req.params.id })
        .populate('team')
        .exec(function (err, data) {
            projDepRepo.handleResponse(res, err, data);
        });
});


// ==================================================
module.exports = router;

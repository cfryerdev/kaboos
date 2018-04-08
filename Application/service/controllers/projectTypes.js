var express = require('express')
  , router = express.Router()
  , modelType = require('../models/projectType')
  , utils = require('../common/utils')
  , mapper = require('../common/mapper')
  , isAuthenticated = require('../middlewares/auth')
  , Repository = require('../common/repository');

var repo = new Repository(modelType);

// ==================================================
// COMMON ROUTES
// ==================================================


// LIST / READALL
// ==================================================
router.get('/', isAuthenticated, function (req, res) {
    repo.list(function (err, collection) {
        repo.handleResponse(res, err, collection);
    });
});

// READ / GET
// ==================================================
router.get('/:id', isAuthenticated, function (req, res) {
    repo.read(req.params.id, function (err, item) {
        repo.handleResponse(res, err, item);
    });
});

// SAVE / CREATE / UPDATE
// ==================================================
router.post('/', isAuthenticated, function (req, res) {
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
});

// ==================================================
// CUSTOM ROUTES
// ==================================================



// ==================================================
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
module.exports = router;

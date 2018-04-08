var express = require('express')
  , router = express.Router()
  , modelType = require('../models/teamMemberRole')
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

// ==================================================
// CUSTOM ROUTES
// ==================================================




// ==================================================
module.exports = router;

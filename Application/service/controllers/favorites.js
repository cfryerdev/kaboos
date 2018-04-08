var express = require('express')
  , router = express.Router()
  , utils = require('../common/utils')
  , Repository = require('../common/repository')
  , isAuthenticated = require('../middlewares/auth');

var modelType = require('../models/favorite');
var repo = new Repository(modelType);

// ==================================================
// COMMON ROUTES
// ==================================================

router.get('/', [isAuthenticated], function (req, res) {
  modelType.find({ userProfile: req.session.user._id})
  .populate('company')
  .populate('project')
  .populate('team')
  .exec(function(err, invites) {
    res.json(invites);
  });
});

router.post('/', isAuthenticated, function (req, res) {
  var model = {};
  model.company = req.body.company;
  model.project = req.body.project;
  model.team = req.body.team;
  model.userProfile = req.session.user._id;

  repo.update(model, function (err, item) {
      repo.handleResponse(res, err, item);
  });
});

router.delete('/:id', isAuthenticated, function (req, res) {
  repo.delete(req.params.id, function (err, item) {
      repo.handleResponse(res, err, { message: 'Record deleted!' });
  });
});

router.post('/check', isAuthenticated, function (req, res) {
  modelType.find({ userProfile: req.session.user._id })
  .populate('company')
  .populate('project')
  .populate('team')
  .exec(function(err, items) {
    var hasMatch = false;
    var id = '';
    utils.forEach(items, function (item) {
      if (req.body.type == 'company') {
        if (item.company && item.company._id == req.body.record) {
          hasMatch = true;
          id = item._id;
        }
      }
      else if (req.body.type == 'project') {
        if (item.project && item.project._id == req.body.record) {
          hasMatch = true;
          id = item._id;
        }
      }
      else if (req.body.type == 'team') {
        if (item.team && item.team._id == req.body.record) {
          hasMatch = true;
          id = item._id;
        }
      }
    });
    var model = {};
    model.isFavorited = hasMatch;
    model.id = id;
    model.type = req.body.type;
    model.record = req.body.record;
    res.json(model);
  });
});

// ==================================================
module.exports = router;

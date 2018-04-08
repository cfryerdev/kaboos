var express = require('express')
	, router = express.Router()
	, userProfileSchema = require('../models/userProfile')
	, userProfileNotificationSchema = require('../models/userProfileNotification')
	//, notificationValidator = require('../validation/notificationValidator')
	, utils = require('../common/utils')


module.exports = {
	list: list,
	markRead: markRead,
	markUnread: markUnread,
	markViewed: markViewed,
	create: create
};

// ==============================================
function list(res, user) {
  userProfileNotificationSchema.find({ userProfile: user._id })
    .exec(function (err, data) {
      if (err) {
        res.status(500).send({messages: [{ message: err.message, type: 'validation' }]});
      }
      res.json(data);
    });
}

function markRead(res, user, id) {
  userProfileNotificationSchema.update({ $and: [{ _id: id }, { userProfile: user._id }] }, {
      isRead: true
  },
  function(err, affected, resp) {
    if (err) {
      res.status(500).send({messages: [{ message: err.message, type: 'validation' }]});
    }
    res.json({status: 'Update Successful'});
  });
}

function markUnread(res, user, id) {
  userProfileNotificationSchema.update({ $and: [{ _id: id }, { userProfile: user._id }] }, {
      isRead: false
  },
  function(err, affected, resp) {
    if (err) {
      res.status(500).send({messages: [{ message: err.message, type: 'validation' }]});
    }
    res.json({status: 'Update Successful'});
  });
}

function markViewed(res, user, id) {
  userProfileNotificationSchema.update({ $and: [{ _id: id }, { userProfile: user._id }] }, {
      isViewed: true
  },
  function(err, affected, resp) {
    if (err) {
      res.status(500).send({messages: [{ message: err.message, type: 'validation' }]});
    }
    res.json({status: 'Update Successful'});
  });
}

function create(res, user, subject, body) {
    var model = new userProfileNotificationSchema();
    model.userProfile = user._id;
    model.subject = subject;
    model.body = body;
    model.isRead = false;
    model.isViewed = false;

    model.save(function(err, data) {
        if (err) {
          res.send(err);
        }
        res.json(data);
    });
}

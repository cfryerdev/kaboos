var express = require('express')
	, router = express.Router()
	, companyMemberManager = require('./companyMemberManager')
	, Repository = require('../common/repository')
	, userProfileSchema = require('../models/userProfile')
	, userProfileInviteSchema = require('../models/userProfileInvite')
	, userProfileInviteStatusSchema = require('../models/userProfileInviteStatus')
	, shortid = require("shortid")
	, utils = require('../common/utils')
	, mapper = require('../common/mapper')
	, validationManager = require('../common/validationManager')
	, profileValidator = require('../validation/userProfileValidator')
	, registerValidators = profileValidator.validateRegister
	, repo = new Repository(userProfileSchema)
	, crypto = require('crypto')
	, companyManager = require('./companyManager');

var hasher = function (password) {
	return crypto.createHash('sha1').update(password).digest('base64');
}

module.exports = {
	getProfile: getProfile,
	savePrefs: savePrefs,
	savePassword: savePassword,
	listMyCompanies: listMyCompanies,
	listInvites: listInvites,
	createInvite: createInvite,
	acceptInvite: acceptInvite,
	declineInvite: declineInvite,
	register: register
};


function getProfile() {

}

function savePrefs() {

}

function savePassword() {

}

function listMyCompanies() {

}

function createInvite(emailAddress, companyMemberType, company, callback) {
	var invite = new userProfileInviteSchema();
	// Search for the user profile by the email address
	userProfileSchema.findOne({ emailAddress: emailAddress }, function (profileError, userProfile) {
		// Execute the query and filter call that excludes Pending or Declined states
		userProfileInviteSchema
			.findOne({ $and: [{ userProfile: userProfile }, { company: company }] })
			.populate('status', null, { status: { $nin: ['Accepted', 'Pending'] } })
			.exec(function (profileError, inviteList) {
				// Make sure we dont have ANY invites that have been sitting in a pending or declined state.
				if (inviteList == null) {
					// We found the profile, find the status of pending and build the invite
					userProfileInviteStatusSchema.findOne({ name: "Pending" }, function (statusError, item) {
						// Set the status to accepted
						invite.status = item._id;
						invite.userProfile = userProfile;
						invite.companyMemberType = companyMemberType;
						invite.company = company;
						invite.inviteCode = shortid.generate();

						// Save the invite and create a companyMember record
						invite.save(function (err, data) {
							callback(err, data);
						});
					});
				}
				else {
					callback(profileError, null);
				}
			});
	});
}

function listInvites(userProfileId) {
	userProfileInviteSchema.find({ userProfile: userProfileId })
		.populate('company')
		.populate('status', 'name')
		.populate('companyMemberType', 'name')
		.exec(function (err, data) {
			return data;
		});
	return [];
}

function acceptInvite(id, callback) {
	// Find the userProfileInvite record
	userProfileInviteSchema.findById(id)
		.populate('company')
		.populate('userProfile')
		.populate('companyMemberType')
		.exec(function (err, invite) {
			// Find the userProfileInvite status of Accepted
			userProfileInviteStatusSchema.findOne({ name: "Accepted" }, function (statusError, item) {
				// Set the status to accepted
				invite.status = item._id;
				// Save the invite and create a companyMember record
				invite.save(function (err, data) {
					// Create the company Member Record
					companyMemberManager.createMember(invite.userProfile._id, invite.company._id, invite.companyMemberType._id);
					callback(err, data);
				});
			});
		});
}

function declineInvite(id, callback) {
	// Find the userProfileInvite record
	userProfileInviteSchema.findById(id)
		.populate('company')
		.populate('userProfile')
		.populate('companyMemberType')
		.exec(function (err, invite) {
			// Find the userProfileInvite status of Accepted
			userProfileInviteStatusSchema.findOne({ name: "Declined" }, function (statusError, item) {
				// Set the status to accepted
				invite.status = item._id;
				// Save the invite and create a companyMember record
				invite.save(function (err, data) {
					// Create the company Member Record
					companyMemberManager.createMember(invite.userProfile._id, invite.company._id, invite.companyMemberType._id);
					callback(err, data);
				});
			});
		});
}

function register(profile) {
	return new Promise(function (res, rej) {
		validationManager.runValidation(registerValidators, profile).then(function (results) {
			if (results.length > 0) {
				rej(results);
			}
			else {
				var model = new userProfileSchema();

				model = mapper.map(profile, model);
				model.password = hasher(model.password);

				model.save(function(err)  {
					if (err) {
						rej(err);
					}
					else {
						if (utils.isDefined(model.companyName)) {
							companyManager.createCompany(model._id, model.companyName);
						}
						// If we have an invite code, validate it, and then add the user to companyMember
						if (utils.isDefined(model.inviteCode)) {

						}
					}
					res(model);
				});
			};

		});
	})
}

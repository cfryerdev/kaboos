var express = require('express')
	, router = express.Router()
	, utils = require('../common/utils')
	, userProfileSchema = require('../models/userProfile')

var emailTester = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
	validateUserProfile: validateUserProfile,
	validateRegister: [
		emailAddressRequired,
		displayNameRequired,
		passwordRequired,
		confirmPasswordRequired,
		emailMustBeValidFormat,
		passwordsMustMatch,
		emailTaken
	],
	validateInvite: validateInvite
};

function validateUserProfile(model) {
	var errors = [];

	if (utils.isNotSet(model)) {
		errors.push({ message: 'Invalid object.', type: 'validation' });
	}

	if (utils.isNotSet(model._id)) {
		errors.push({ message: 'Unable to create, please use /register.', type: 'validation' });
	}

	if (utils.isNotSet(model.emailAddress)) {
		errors.push({ message: 'Profile email address is required.', type: 'validation' });
	}

	if (utils.isNotSet(model.displayName)) {
		errors.push({ message: 'Profile display name is required.', type: 'validation' });
	}

	return errors;
}

function validateRegister(model) {

}

function validatePassword(model) {
	var errors = [];

	if (utils.isNotSet(model)) {
		errors.push({ message: 'Invalid object.', type: 'validation' });
	}

	return errors;
}

function validateInvite(model) {
	var errors = [];

	if (utils.isNotSet(model)) {
		errors.push({ message: 'Invalid object.', type: 'validation' });
	}

	if (utils.isNotSet(model.inviteCode)) {
		errors.push({ message: 'Invite code is required.', type: 'validation' });
	}

	if (utils.isNotSet(model.companyMemberProfile)) {
		errors.push({ message: 'Invite member type is required.', type: 'validation' });
	}

	if (utils.isNotSet(model.userProfile)) {
		errors.push({ message: 'Invite profile is required.', type: 'validation' });
	}

	if (utils.isNotSet(model.company)) {
		errors.push({ message: 'Invite company is required.', type: 'validation' });
	}

	return errors;
}

// Email address required
// ==============================================
function emailAddressRequired(model, res) {
	if (utils.isNotSet(model.emailAddress)) {
		var result = { message: 'Email address is required.', type: 'validation' };
	}
	res(result);
}

// Display name required
// ==============================================
function displayNameRequired(model, res) {
	if (utils.isNotSet(model.displayName)) {
		var result = { message: 'DisplayName is required.', type: 'validation' };
	}
	res(result);
}

// Email must be valid
// ==============================================
function emailMustBeValidFormat(model, res) {
	if (!emailTester.test(model.emailAddress)) {
		var result = { message: 'You must add a valid email address.', type: 'validation' };
	}
	res(result);
}

// Passwords must match
// ==============================================
function passwordsMustMatch(model, res) {
	if (model.password != model.confirmPassword) {
		var result = { message: 'Passwords must match.', type: 'validation' };
	}
	res(result);
}

// Email taken
// ==============================================
function emailTaken(model, res, rej) {
	if (utils.isDefined(model.emailAddress)) {
		userProfileSchema.findOne({ 'emailAddress': model.emailAddress }, function (err, data) {
			if (err) {
				rej(err);
			}
			else {
				if (utils.isDefined(data)) {
					var result = { message: 'Email address is taken.', type: 'validation' };
				}
			}			
			res(result);
		});
	}
	res();
}

// Password required
// ==============================================
function passwordRequired(model, res) {
	if (utils.isNotSet(model.password)) {
		var result = { message: 'Password is required.', type: 'validation' };
	}
	res(result);
}

// ConfirmPassword required
// ==============================================
function confirmPasswordRequired(model, res) {
	if (utils.isNotSet(model.confirmPassword)) {
		var result = { message: 'Confirm Password is required.', type: 'validation' };
	}
	res(result);
}
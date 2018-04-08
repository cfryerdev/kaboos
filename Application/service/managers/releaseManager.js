var express = require('express')
	, router = express.Router()
	, releaseSchema = require('../models/release')
	, releaseStageSchema = require('../models/releaseStage')
	, releaseStatusSchema = require('../models/releaseStatus')
	, companyMemberSchema = require('../models/companyMember')
	, releaseProjectSchema = require('../models/releaseProject')
	, releaseTeamSchema = require('../models/releaseTeam')
	, releaseMemberchema = require('../models/releaseMember')
	, validationManager = require('../common/validationManager')
	, releaseValidation = require('../validation/releaseValidator')
	, releaseStatusSchema = require('../models/releaseStatus')
	, releaseStageSchema = require('../models/releaseStage')
	, mapper = require('../common/mapper')
	, utils = require('../common/utils')

module.exports = {
	listReleases: listReleases,
	listStatuses: listStatuses,
	listStages: listStages,
	getRelease: getRelease,
	getProjectsByReleaseId: getProjectsByReleaseId,
	getMembersByReleaseId: getMembersByReleaseId,
	getTeamsByReleaseId: getTeamsByReleaseId,
	saveRelease: saveRelease
}

// List releases
// ==============================================
function listReleases(user) {
	return new Promise(function (resolve, reject) {
		// Get all companies user belongs to
		companyMemberSchema.find({ userProfile: user._id })
			.populate('company')
			.exec(function (err, memberships) {

				// Any errors -> send errors
				if (err) {
					reject({ message: err, type: 'server' });
				}
				else {
					// Array to hold releases for each company
					var releasesToReturn = [];
					for (var membershipCount = 0; membershipCount < memberships.length; membershipCount++) {
						releaseSchema.find({ company: memberships[membershipCount].company.id })
							.populate('company')
							.populate('releaseStage')
							.populate('releaseStatus')
							.exec(function (err, releases) {

								// Any errors -> send errors
								if (err) {
									reject({ message: err, type: 'server' });
								}

								// Else send the results
								else {
									for (var releaseCount = 0; releaseCount < releases.length; releaseCount++) {
										releasesToReturn.push(releases[releaseCount]);

										// Resolve if we have processes all memberships and releases
										if (membershipCount == memberships.length && releaseCount == releases.length - 1) {
											resolve(releasesToReturn);
										}
									}
								}
							});
					}
				}
			});
	})
}

function getRelease(releaseId) {
	return new Promise(function (resolve, reject) {
		releaseSchema.findById(releaseId)
		.populate('company')
		.populate('releaseStage')
		.populate('releaseStatus')
		.exec(function (err, release) {
			if (err) {
				reject({ message: err, type: 'server' });
			}
			else {
				resolve(release);
			}
		})
	});
}

function listStages(releaseId) {
	return new Promise(function (resolve, reject) {
		releaseStageSchema.find(function (err, release) {
			if (err) {
				reject({ message: err, type: 'server' });
			}
			else {
				resolve(release);
			}
		})
	});
}

function listStatuses(releaseId) {
	return new Promise(function (resolve, reject) {
		releaseStatusSchema.find(function (err, release) {
			if (err) {
				reject({ message: err, type: 'server' });
			}
			else {
				resolve(release);
			}
		})
	});
}

function getProjectsByReleaseId (releaseId) {
	return new Promise(function (resolve, reject) {
		releaseProjectSchema.find({ releaseId: releaseId})
		.populate('project')
		.exec(function (err, release) {
			if (err) {
				reject({ message: err, type: 'server' });
			}
			else {
				resolve(release);
			}
		})
	});
}

function getMembersByReleaseId (releaseId) {
	return new Promise(function (resolve, reject) {
		releaseMemberSchema.find({ releaseId: releaseId})
		.populate('companyMember')
		.exec(function (err, release) {
			if (err) {
				reject({ message: err, type: 'server' });
			}
			else {
				resolve(release);
			}
		})
	});
}

function getTeamsByReleaseId (releaseId) {
	return new Promise(function (resolve, reject) {
		releaseTeamSchema.find({ releaseId: releaseId})
		.populate('team')
		.exec(function (err, release) {
			if (err) {
				reject({ message: err, type: 'server' });
			}
			else {
				resolve(release);
			}
		})
	});
}

// Save release
// ==============================================
function saveRelease(release) {
	return new Promise(function (resolve, reject) {

		// Create new model
		var model = new releaseSchema();

		// Map properties of input to new model
		model = mapper.map(release, model);

		// Run validation on model
		validationManager.runValidation(releaseValidation.createRelease, model)
			.then(function (results) {
				if (results.lenght > 0) {
					// Validation fails -> send errors
					reject(results);
				}
				else {
					// Else save the model
					model.save(function (err, release) {
						if (err) {
							// Any errors -> send errors
							reject({ message: err, type: 'server' });
						}

						else {
							// Else send the model
							resolve(release);
						}
					});
				}
			});
	});
}

// Delete release
// ==============================================
function deleteRelease(releaseId) {
	return new Promise(function (resolve, reject) {
		releaseSchema.findByIdAndDelete(releaseId, function (err, release) {
			if (err) {
				reject({ message: err, type: 'server' });
			}
			else {
				resolve(release);
			}
		})
	});
}

// Find by comi

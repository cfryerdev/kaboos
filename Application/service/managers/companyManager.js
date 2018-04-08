var express = require('express')
, router = express.Router()
, companySchema = require('../models/company')
, companyMemberSchema = require('../models/companyMember')
, teamSchema = require('../models/team')
, projectSchema = require('../models/project')
, companyMemberManager = require('../managers/companyMemberManager')
, utils = require('../common/utils')
, mapper = require('../common/mapper');


module.exports = {
  listCompanies: listCompanies,
  getCompany: getCompany,
  createCompany: createCompany,
  updateCompany: updateCompany,
  listTeams: listTeams,
  listProjects: listProjects,
  createInvite: createInvite,
  deleteCompany: deleteCompany,
  checkAccess: checkAccess
};


function listCompanies() {
  companyMemberSchema.find({ userProfile: req.session.user._id })
  	.populate('company')
  	.exec(function (err, item) {
      var activeCompanies = item.filter(function(a) {
        return a.company.isActive == true;
      });
      var companies = activeCompanies.map(function(a) {
        return a.company;
      });
  		return companies;
  	});
    return [];
}

function getCompany(companyId) {
  companyMemberSchema.findById(companyId, function(err, data) {
      return data;
  });
  return {};
}

// function getCompaniesByIds() {
//   model.find({
//       '_id': { $in: [
//           mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
//           mongoose.Types.ObjectId('4ed3f117a844e0471100000d'),
//           mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
//       ]}
//   }, function(err, docs){
//        console.log(docs);
//   });
// }

function createCompany(userProfileId, name, callback) {
  var model = new companySchema();
  model.name = name;
  model.save(function(err, numberAffected, rawResponse) {
    companyMemberManager.createOwner(userProfileId, model._id);
    if (callback != undefined) {
       callback(err, model);
    }
  });
}

function updateCompany(model) {
  if (!model.isActive) {

  }

}

function listTeams(companyId) {

}

function listProjects(companyId) {

}

function createInvite(model) {
  // Will take in  a model containing company, emailAddress, and companyMemberType
	// Will always be 200 unless missing fields (validation)
	// Will return generic success message ('If this email address is shown to be valid, an invite will be created. Thanks')
	// Store shortid on invite

  // Lookup the userProfile by req.body.emailAddress
  // If the userProfile is not null, continue...
  // Create a userProfileInvite object
  // Set the status to PENDING
  // Generate a UUID and set it as the invite code
  // Save to the database....
}

function deleteCompany(companyId) {
  companySchema.findById(companyId, function(err, data) {
    data.isActive = false;
    data.save();
  });
}

function checkAccess(companyId, userProfileId, callback) {
  console.log('Checking access...');
	companyMemberSchema.findOne({$and: [{company: companyId}, {userProfile: userProfileId}]}, function(err, data) {
    if (!utils.isDefined(data)) {
      callback(false);
    }
    else {
      var hasAccess = false;
      companySchema.findOne({_id: data.company}, function(err, data) {
  			if (data != null && !utils.isDefined(err)) {
  				hasAccess = true;
  			}
  			callback(hasAccess);
  		});
    }

	});
}

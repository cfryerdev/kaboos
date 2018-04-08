var express = require('express')
, router = express.Router()
, companyMemberSchema = require('../models/companyMember')
, companyMemberTypeSchema = require('../models/companyMemberType')
, utils = require('../common/utils')
, mapper = require('../common/mapper');


module.exports = {
  getTypes: getTypes,
  getOwnerType: getOwnerType,
  listMembers: listMembers,
  createMember: createMember,
  createOwner: createOwner,
  deleteMember: deleteMember,
  changeType: changeType,
};

// Get all the types members can be
// ---------------------------------------------------------
function getTypes() {
  companyMemberTypeSchema
      .find()
      .exec(function (err, data) {
          return data;
      });
  return [];
}

// Get just the member type for Owners
// ---------------------------------------------------------
function getOwnerType() {
  var items = getTypes();
  return items.filter(function (item) { return item.name == 'Owner' })[0];
}

// Get a list of memmbers by company
// ---------------------------------------------------------
function listMembers(companyId) {
  companyMemberSchema.find({ company: companyId })
  	.populate('company')
    .populate('userProfile')
    .populate('companyMemberType')
  	.exec(function (err, data) {
  		return data;
  	});
  return [];
}

// Add a member to a company requiring a type
// ---------------------------------------------------------
function createMember(userProfileId, companyId, typeId) {
  var model = new companyMemberSchema();
  model.userProfile = userProfileId;
  model.company = companyId;
  model.companyMemberType = typeId;
  model.save();
}

// Add a owner to a company
// ---------------------------------------------------------
function createOwner(userProfileId, companyId) {
  var model = new companyMemberSchema();
  model.userProfile = userProfileId;
  model.company = companyId;
  model.companyMemberType = getOwnerType();
  model.save();
}

// Remove a member from a company
// ---------------------------------------------------------
function deleteMember(id) {
  companyMemberSchema.remove({ _id: id });
}

// Update a member to have a specific type...
// ---------------------------------------------------------
function changeType(id, typeId) {
  companyMemberSchema.findById(id, function(err, data) {
    data.companyMemberType = typeId;
    data.save();
  });
}

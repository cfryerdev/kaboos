var express = require('express')
  , router = express.Router()
  , utils = require('../../common/utils')
  , isAuthenticated = require('../../middlewares/auth')
  , companyAccess = require('../../middlewares/companyAccess');

var companySchema = require('../../models/company');
var companyMemberSchema = require('../../models/companyMember');
var projectSchema = require('../../models/project');
var teamProjectSchema = require('../../models/teamProject');
var teamSchema = require('../../models/team');

// ==================================================
// COMMON ROUTES
// ==================================================

router.get('/:companyId', [isAuthenticated, companyAccess], function (req, res) {
  var company = {};

  companySchema.findById(req.params.companyId)
  .then(function (companyRecord) {
    company = companyRecord.toObject();

    companyMemberSchema.find({ company: req.params.companyId })
      .populate('companyMemberType', 'name')
      .populate('userProfile')
      .then(function (memberRecords) {
        company['members'] = memberRecords;

        teamSchema.find({ company: req.params.companyId })
          .then(function (teamRecords) {
            company['teams'] = teamRecords;

            projectSchema.find({ company: req.params.companyId })
              .populate('projectType', 'name')
              .then(function (projectRecords) {
                company['projects'] = projectRecords;

                teamProjectSchema.find({ company: req.params.companyId })
                  .populate('team', 'name')
                  .then(function (tpRecords) {

                    var updatedProjects = projectRecords.map(function(p) {

                        var childTeamProjects = tpRecords.filter(function(x) {
                          return x.project = p._id
                        });
                        p['teamProjects'] = childTeamProjects;
                        return p;
                    });
                    company.projects = updatedProjects;

                    res.json(company);
                  })
                  .catch(function (err) {
                    console.log(err);
                    res.json(company);
                  });

              })
              .catch(function (err) {
                console.log(err);
                res.json(company);
              });
          })
          .catch(function (err) {
            console.log(err);
            res.json(company);
          });
    })
    .catch(function (err) {
      console.log(err);
      res.json(company);
    });
  })
  .catch(function (err) {
    console.log(err);
    res.json(company);
  });

  //res.json(company);
});

// ==================================================
module.exports = router;

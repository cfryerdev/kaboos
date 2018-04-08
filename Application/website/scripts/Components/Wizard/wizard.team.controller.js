(function () {
    angular.module('wizard').controller('WizardTeamController', WizardTeamController);

    WizardTeamController.$inject = ['alertService', 'errorService', '$q', 'companyService', 'teamService', 'projectService'];

    function WizardTeamController(alertService, errorService, $q, companyService, teamService, projectService) {
        var vm = this;
        vm.isSaving = false;
        vm.isNew = true;
        vm.isLoading = false;
        vm.companies = [];
        vm.companyName = '';
        vm.projects = [];
        vm.members = [];
        vm.team = {};
        vm.step = 1;

        vm.selectCompany = selectCompany;
        vm.setStep = setStep;
        vm.save = save;

        /****** Constructor ******/

        (function () {
          listCompanyData();
        })();

        /****** Exposed Functions ******/

        vm.isCheckedMember = function(id, state){
          angular.forEach(vm.members, function(member) {
            if (member._id == id) {
              member.selected = state;
            }
          });
        };

        vm.isCheckedProject = function(id, state){
          angular.forEach(vm.projects, function(project) {
            if (project._id == id) {
              project.selected = state;
            }
          });
        };

        function selectCompany() {
          vm.team.name = '';
          vm.team.description = '';

          loadCompanyName(vm.team.companyId);
          listProjects(vm.team.companyId);
          listMembers(vm.team.companyId);
        }

        function setStep(id) {
          alertService.clear();
          switch (id) {
            case 2:
              if (validateStep1()) {
                vm.step = 2;
              }
              break;
            case 3:
              if (validateStep1() && validateStep2()) {
                vm.step = 3;
              }
              break;
            case 4:
              if (validateStep1() && validateStep2()) {
                vm.step = 4;
              }
              break;
          }
        }

        function save() {
          saveTeam()
          .then(function() {
            var promises = [saveTeamProjects(), saveMembers()];
            $q.all(promises)
            .then(function(data) {
                $location.path('companies/' + vm.team.companyId + '/teams/' + vm.team._id);
            });
          });
        }

        function saveTeam() {
          var defer = $q.defer();
          teamService.save(vm.team, function (data) {
              vm.team = data;
              defer.resolve(data);
          },
          function (err) {
            errorService.handleError(err);
            defer.reject(err);
          });
          return defer.promise;
        }

        function saveTeamProjects() {
          angular.forEach(vm.projects, function (prj) {
            if (prj.selected) {
              saveTeamProjectSingle(prj._id, vm.team._id);
            }
          });
        }

        function saveMembers() {
          angular.forEach(vm.members, function (mem) {
            if (mem.selected) {
              saveMemberSingle(vm.team._id, mem._id);
            }
          });
        }

        function saveMemberSingle(teamId, memberId) {
          var defer = $q.defer();
          projectService.addTeamMember({ team: teamId, companyMember: memberId },
            function (data) { defer.resolve(data); },
            function (err) { defer.reject(err); }
          );
          return defer.promise;
        }

        function saveTeamProjectSingle(projectId, teamId) {
          var defer = $q.defer();
          projectService.addTeamProject({ project: projectId, team: teamId },
            function (data) { defer.resolve(data); },
            function (err) { defer.reject(err); }
          );
          return defer.promise;
        }

        /****** Private Functions ******/

        function listCompanyData() {
            companyService.list(null, function (data) {
                vm.companies = data;
            }, undefined, undefined);
        }

        function listProjects(companyId) {
          if (companyId == null || companyId == '') {
            vm.projects = [];
          } else {
            companyService.getProjects(companyId, function (data) {
                vm.projects = data;
            }, undefined, undefined);
          }
        }

        function listMembers(companyId) {
          if (companyId == null || companyId == '') {
            vm.members = [];
          } else {
            companyService.getMembers(companyId, function (data) {
                vm.members = data;
            }, undefined, undefined);
          }
        }

        function loadCompanyName(companyId) {
          if (companyId == null || companyId == '') {
            vm.companyName = '';
          } else {
            vm.companies.map(function (c) {
              if (c._id == companyId) {
                vm.companyName = c.name;
              }
            });
          }
        }

        function validateStep1() {
          if (vm.team.companyId && vm.team.companyId != '') {
            return true;
          }
          else {
            alertService.add('danger', "Company is required.");
            return false;
          }
        }

        function validateStep2() {
          var errors = [];
          if (!vm.team.name || vm.team.name == '') {
            errors.push({ type: 'danger', msg: 'Team Name is required.' });
          }

          if (errors.length == 0) {
            return true;
          }
          else {
            alertService.addArray(errors);
            return false;
          }
        }

        function validateStep3() {
          return true;
        }
    }

})();

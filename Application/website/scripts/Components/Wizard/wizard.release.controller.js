(function () {
    angular.module('wizard').controller('WizardReleaseController', WizardReleaseController);

    WizardReleaseController.$inject = ['alertService', '$q', 'companyService', 'teamService', 'projectService'];

    function WizardReleaseController(alertService, $q, companyService, teamService, projectService) {
        var vm = this;
        vm.isSaving = false;
        vm.isNew = true;
        vm.isLoading = false;
        vm.companies = [];
        vm.companyName = '';
        vm.teams = [];
        vm.projects = [];
        vm.members = [];
        vm.release = {};
        vm.step = 1;

        vm.selectCompany = selectCompany;
        vm.isCheckedMember = isCheckedMember;
        vm.isCheckedProject = isCheckedProject;
        vm.isCheckedTeam = isCheckedTeam;
        vm.setStep = setStep;

        /****** Constructor ******/

        (function () {
            listCompanyData();
        })();

        /****** Exposed Functions ******/

        function setStep(id) {
          alertService.clear();
          vm.step = id;
        }

        function isCheckedMember(id, state) {
          angular.forEach(vm.members, function(member) {
            if (member._id == id) {
              member.selected = state;
            }
          });
        };

        function isCheckedProject(id, state) {
          angular.forEach(vm.projects, function(project) {
            if (project._id == id) {
              project.selected = state;
            }
          });
        };

        function isCheckedTeam(id, state) {
          angular.forEach(vm.teams, function(team) {
            if (team._id == id) {
              team.selected = state;
            }
          });
        };


        function selectCompany() {
          loadCompanyName(vm.release.companyId);
          listTeams(vm.release.companyId);
          listProjects(vm.release.companyId);
          listMembers(vm.release.companyId);
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

        function listTeams(companyId) {
          if (companyId == null || companyId == '') {
            vm.teams = [];
          } else {
            companyService.getTeams(companyId, function (data) {
                vm.teams = data;
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

    }

})();

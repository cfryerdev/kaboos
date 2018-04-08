(function () {
    angular.module('wizard').controller('WizardProjectController', WizardProjectController);

    WizardProjectController.$inject = ['$location', '$q','alertService', 'companyService', 'teamService', 'projectService'];

    function WizardProjectController($location, $q, alertService, companyService, teamService, projectService) {
        var vm = this;
        vm.isSaving = false;
        vm.isLoading = false;
        vm.companies = [];
        vm.companyName = '';
        vm.teams = [];
        vm.project = {};
        vm.step = 1;

        vm.selectCompany = selectCompany;
        vm.setStep = setStep;
        vm.save = save;

        /****** Constructor ******/

        (function () {
          listCompanyData();
          listProjectTypes();
        })();


        /****** Exposed Functions ******/

        vm.isCheckedTeam = function(id, state){
          angular.forEach(vm.teams, function(team) {
            if (team._id == id) {
              team.selected = state;
            }
          });
        };

        function selectCompany() {
          vm.project.name = '';
          vm.project.description = '';
          vm.project.projectType = '';

          loadCompanyName(vm.project.companyId);
          listTeams(vm.project.companyId);
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
          }
        }

        function save() {
          if (validateStep1() && validateStep2() && validateStep3()) {
            projectService.save(vm.project,
              function (prj) {
                var count = 0;
                angular.forEach(vm.teams, function (team) {
                  if (team.selected) {
                    ++count;
                    projectService.addTeamProject({ project: prj._id, team: team._id },
                      function () {
                        $location.path('companies/' + vm.project.companyId + '/projects/' + prj._id);
                      }, undefined, undefined);
                  }
                });
                if (count == 0) {
                  $location.path('companies/' + vm.project.companyId + '/projects/' + prj._id);
                }
              }, undefined, undefined);
          }
        }

        /****** Private Functions ******/

        function listCompanyData() {
            companyService.list(null, function (data) {
                vm.companies = data;
            }, undefined, undefined);
        }

        function listProjectTypes() {
          projectService.getProjectTypes(function (data) {
              vm.projectTypes = data;
          }, undefined, undefined);
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
          if (vm.project.companyId && vm.project.companyId != '') {
            return true;
          }
          else {
            alertService.add('danger', "Company is required.");
            return false;
          }
        }

        function validateStep2() {
          var errors = [];
          if (!vm.project.name || vm.project.name == '') {
            errors.push({ type: 'danger', msg: 'Project Name is required.' });
          }
          if (!vm.project.projectType || vm.project.projectType == '') {
            errors.push({ type: 'danger', msg: 'Project Type is required.' });
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

(function () {
    angular.module('project').controller('addProjectTeamController', addProjectTeamController);

    addProjectTeamController.$inject = ['$controller', '$scope', 'options', '$modalInstance', 'alertService', 'companyService', 'projectService'];

    function addProjectTeamController($controller, $scope, options, $modalInstance, alertService, companyService, projectService) {
        var vm = this;
        var base = {};
        vm.projectId = '';
        vm.teams = [];
        vm.selectedTeamId = '';

        /****** Constructor ******/

        (function () {
            angular.extend(vm, options);
            companyService.getTeams(vm.companyId,
                function (data) {
                    vm.teams = data;
                },
                undefined, undefined);
        })();

        vm.add = function () {
            projectService.addTeamProject({ project: vm.projectId, team: vm.selectedTeamId },
                function (data) {
                    $modalInstance.close(data);
                },
                function () {
                    alertService.popToast('error', "Oops.", "Unable to save, please try again.");
                }, undefined);
        }

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})();

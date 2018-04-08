(function () {
    angular.module('project').controller('AddProjectController', addProjectController);

    addProjectController.$inject = ['$controller', '$scope', 'options', '$modalInstance', 'alertService' ,'companyService', 'projectService'];

    function addProjectController($controller, $scope, options, $modalInstance, alertService, companyService, projectService) {
        var vm = this;
        var base = {};
        vm.projects = [];
        vm.projectId = '';
        vm.companyId = '';
        vm.selectedProjectId = '';
        vm.model = {};

        /****** Constructor ******/

        (function () {
            angular.extend(vm, options);
            companyService.getProjects(vm.companyId,
                function (data) {
                    vm.projects = data;
                },
                undefined, undefined);
        })();

        vm.add = function () {
            if (vm.projectType.toUpperCase() == 'PARENT') {
                vm.model.projectParent = vm.selectedProjectId;
                vm.model.projectChild = vm.projectId;
            } else {
                vm.model.projectChild = vm.selectedProjectId;
                vm.model.projectParent = vm.projectId;
            }

            projectService.addProjecttDependency(vm.model,
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

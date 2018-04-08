(function () {
    angular.module('project').controller('ProjectEditController', projectEditController);

        projectEditController.$inject = ['$routeParams', '$uibModal', '$location', '$scope', '$rootScope', '$controller', 'projectService', 'alertService', 'errorService'];

        function projectEditController($routeParams, $uibModal, $location, $scope, $rootScope, $controller, projectService, alertService, errorService) {
        var vm = this;
        var base = {};

        vm.isSaving = false;
        vm.isNew = true;
        vm.isLoading = false;

        vm.companyId = 0;
        vm.projectId = 0;
        vm.company = {};
        vm.project = {};
        vm.parents = {};
        vm.children = {};
        vm.teams = [];


        /****** Public Functions ******/

        vm.saveProjectData = saveProjectData;
        vm.deleteProjectData = deleteProjectData;
        vm.addProjectDep = addProjectDep;
        vm.addTeamProject = addTeamProject;


        /****** Constructor ******/

        (function () {
            vm.isLoading = true;
            if (angular.isDefined($routeParams.projectId) && $routeParams.projectId == 'new') {
                vm.isLoading = false;
                vm.isNew = true;
                lazyLoadData();
            }

            base = $controller('BaseProjectController', { $scope: $scope });
        })();

        /****** Base Call Events ******/

        $scope.$on('loadCompanyDataSuccess', function (event, data) {
            vm.companyId = data._id;
            vm.company = data;
        });

        $scope.$on('loadProjectDataSuccess', function (event, data) {
            vm.projectId = data._id;
            vm.project = data;
            vm.isNew = false;
            vm.isLoading = false;
            lazyLoadData();

            $rootScope.$broadcast('checkIsFavorited', data._id);
        });

        $scope.$on('loadProjectDataFailure', function (event, data) {
            alertService.popToast('error', "Error Loading", "Error getting record from service.");
            vm.isLoading = false;
        });

        $scope.$on('saveProjectDataFailure', function (event, data) {
            errorService.handleError(data);
            vm.isSaving = false;
        });

        $scope.$on('saveProjectDataSuccess', function (event, data) {
            vm.projectId = data._id;
            vm.project = data;
            vm.isSaving = false;

            $rootScope.$broadcast('checkIsFavorited', data._id);

            alertService.add('success', "Save Successful.");
            if (vm.isNew) {
                $location.path('companies/' + vm.companyId + '/projects/' + vm.projectId);
            }
        });

        $scope.$on('deleteProjectDataSuccess', function (event, data) {
            $location.path('companies/' + vm.companyId);
            alertService.popToast('success', "Delete Successful", "Deleted record successfully.");
        });

        /****** Private Functions ******/

        function lazyLoadData() {
            projectService.getProjectTypes(function (data) {
                vm.projectTypes = data;
            }, undefined, undefined);

            if (vm.projectId  != '') {
                projectService.getParents(vm.projectId, function (data) {
                    vm.parents = data;
                }, undefined, undefined);

                projectService.getChildren(vm.projectId, function (data) {
                    vm.children = data;
                }, undefined, undefined);

                projectService.getTeams(vm.projectId, function (data) {
                    vm.teams = data;
                }, undefined, undefined);
            }
        }

        function saveProjectData() {
            vm.isSaving = true;
            if (vm.isNew) {
                vm.project.companyId = vm.companyId;
            }
            base.saveProjectData(vm.project);
        }

        function deleteProjectData() {
            vm.isSaving = true;
            base.deleteProjectData(vm.project._id);
        }

        function addProjectDep(projectType) {
            $uibModal.open({
                backdrop: 'static',
                templateUrl: 'templates/projects/addProjectModal.html',
                controller: 'AddProjectController',
                controllerAs: 'modalCtrl',
                size: 'small',
                resolve: {
                    options: function () {
                        return {
                            title: 'Add ' + projectType + ' Project',
                            projectName: vm.project.name,
                            projectId: vm.project._id,
                            companyId: vm.company._id,
                            projectType: projectType,
                            okText: 'Yes, Add ' + projectType,
                            cancelText: 'Cancel'
                        }
                    }
                }
            })
            .result
            .then(function (data) {
                if (projectType.toUpperCase() == 'PARENT') {
                    vm.parents.push(data);
                } else {
                    vm.children.push(data);
                }
                alertService.add('success', "Save Successful.");
            }, function () {
                // cancel callback
            });
        }


        function addTeamProject() {
            $uibModal.open({
                backdrop: 'static',
                templateUrl: 'templates/projects/addProjectTeamModal.html',
                controller: 'addProjectTeamController',
                controllerAs: 'modalCtrl',
                size: 'small',
                resolve: {
                    options: function () {
                        return {
                            title: 'Add Team Project',
                            projectName: vm.project.name,
                            projectId: vm.project._id,
                            companyId: vm.company._id,
                            okText: 'Yes, Add Team',
                            cancelText: 'Cancel'
                        }
                    }
                }
            })
            .result
            .then(function (data) {
                vm.teams.push(data);
                alertService.add('success', "Save Successful.");
            }, function () {
                // cancel callback
            });
        }

        //addProjectTeamModal


    }
})();

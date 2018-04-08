(function () {
    angular.module('team').controller('TeamEditController', teamEditController);

    teamEditController.$inject = ['$controller', '$scope', '$rootScope', '$routeParams', '$modal', '$location', 'alertService', 'teamService', 'errorService'];

    function teamEditController($controller, $scope, $rootScope, $routeParams, $modal, $location, alertService, teamService, errorService) {
        var vm = this;
        var base = {};

        vm.isSaving = false;
        vm.isNew = true;
        vm.isLoading = false;

        vm.companyId = 0;
        vm.company = {};
        vm.teamId = 0;
        vm.team = {};
        vm.members = [];
        vm.projects = [];


        /****** Constructor ******/

        (function () {
            vm.isLoading = true;
            base = $controller('BaseCompanyController', { $scope: $scope });
        })();


        /****** Base Call Events ******/

        $scope.$on('loadCompanyDataSuccess', function (event, data) {
            vm.companyId = data._id;
            vm.company = data;
            init();
        });

        $scope.$on('saveTeamDataSuccess', function (event, data) {
            vm.teamId = data._id;
            vm.team = data;
            vm.isSaving = false;

            alertService.add('success', "Save Successful.");
            if (vm.isNew) {
                $location.path('companies/' + vm.companyId + '/teams/' + vm.teamId);
            }
        });

        $scope.$on('saveTeamDataFailure', function (event, data) {
            errorService.handleError(data);
            vm.isSaving = false;
        });

        $scope.$on('deleteTeamDataSuccess', function (event, data) {
            $location.path('companies/' + vm.companyId);
            alertService.add('success', "Deleted record successfully.");
        });


        /****** Exposed Functions ******/

        vm.saveTeamData = saveTeamData;
        vm.deleteTeamData = deleteTeamData;
        vm.addTeamProject = addTeamProject;
        vm.addTeamMember = addTeamMember;

        /****** Private Functions ******/

        function init() {
            alertService.clear();
            if (angular.isDefined($routeParams.teamId) && $routeParams.teamId  != 'new') {
                vm.teamId = $routeParams.teamId;
                vm.isNew = false;
                loadTeamData($routeParams.teamId);
            } else {
                vm.isLoading = false;
            }
        }

        function loadTeamData() {
            teamService.get(vm.teamId,
                function (data) {
                    vm.team = data;
                    $rootScope.$broadcast('checkIsFavorited', data._id);
                    $scope.$emit('loadTeamDataSuccess', data);
                },
                function (data) {
                    $scope.$emit('loadTeamDataFailure', data);
                },
                function (data) {
                    vm.isLoading = false;
                    $scope.$emit('loadTeamDataFinally', data);
                });

            teamService.getProjects(vm.teamId, function (data) {
                vm.projects = data;
            }, undefined, undefined);

            teamService.getTeamMembers(vm.teamId, function (data) {
                vm.members = data;
            }, undefined, undefined);
        }

        function saveTeamData() {
            alertService.clear();

            if (vm.isNew) {
                vm.team.companyId = vm.companyId;
            }

            teamService.save(vm.team,
                function (data) {
                    vm.team = data;
                    $scope.$emit('saveTeamDataSuccess', data);
                    $rootScope.$broadcast('checkIsFavorited', data._id);
                },
                function (data) { $scope.$emit('saveTeamDataFailure', data); },
                function (data) { $scope.$emit('saveTeamDataFinally', data); });
        }

        function deleteTeamData() {
            $modal.open({
                backdrop: 'static',
                templateUrl: 'Templates/_common/confirmationModal.html',
                controller: 'ConfirmModalController as confirmModalCtrl',
                size: 'small',
                resolve: {
                    options: function () {
                        return {
                            title: 'Delete Team',
                            message: 'Are you sure that you want to delete this Team? This means also deleting any data stored within the Team.',
                            okText: 'Yes, Delete',
                            cancelText: 'Cancel'
                        }
                    }
                }
            }).result.then(function (confirm) {
                if (!confirm) { return; }
                teamService.remove(vm.teamId,
                        function (data) {
                            $scope.$emit('deleteTeamDataSuccess', data);
                        },
                        function (data) { $scope.$emit('deleteTeamDataFailure', data); },
                        function (data) { $scope.$emit('deleteTeamDataFinally', data); });
            }, function () {
                // cancel callback
            });
        }

        function addTeamProject() {
            $modal.open({
                backdrop: 'static',
                templateUrl: 'templates/teams/addTeamProjectModal.html',
                controller: 'addTeamProjectController',
                controllerAs: 'modalCtrl',
                size: 'small',
                resolve: {
                    options: function () {
                        return {
                            title: 'Add Team Project',
                            teamName: vm.team.name,
                            teamId: vm.team._id,
                            companyId: vm.company._id,
                            okText: 'Yes, Add Project',
                            cancelText: 'Cancel'
                        }
                    }
                }
            })
            .result
            .then(function (data) {
                vm.projects.push(data);
                alertService.add('success', "Save Successful.");
            }, function () {
                // cancel callback
            });
        }

        function addTeamMember() {
            $modal.open({
                backdrop: 'static',
                templateUrl: 'templates/teams/addTeamMemberModal.html',
                controller: 'addTeamMemberController',
                controllerAs: 'modalCtrl',
                size: 'small',
                resolve: {
                    options: function () {
                        return {
                            title: 'Add Team Member',
                            teamName: vm.team.name,
                            teamId: vm.team._id,
                            companyId: vm.company._id,
                            companyName3: vm.company.name,
                            okText: 'Yes, Add Member',
                            cancelText: 'Cancel'
                        }
                    }
                }
            })
            .result
            .then(function (data) {
                vm.members.push(data);
                alertService.add('success', "Save Successful.");
            }, function () {
                // cancel callback
            });
        }
    }

})();

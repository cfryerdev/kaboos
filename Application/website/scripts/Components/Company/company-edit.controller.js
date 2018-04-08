(function() {
    angular.module('company').controller('CompanyEditController', companyEditController);

    companyEditController.$inject = ['$routeParams', '$rootScope', '$location', '$scope', '$controller', '$modal', 'companyService', 'projectService', 'alertService', 'errorService'];

    function companyEditController($routeParams, $rootScope, $location, $scope, $controller, $modal, companyService, projectService, alertService, errorService) {
        var vm = this;
        var base = {};

        vm.isSaving = false;
        vm.isNew = true;
        vm.isLoading = false;

        vm.companyId = 0;
        vm.company = {};
        vm.projects = [];
        vm.teams = [];
        vm.projectTypes = [];
        vm.members = [];
        vm.topology = {};
        vm.hasVsOnline = false;
        vm.hasGitlab = false;
        vm.hasGitHub = false;


        /****** Constructor ******/

        (function () {
            vm.isLoading = true;

            if (angular.isDefined($routeParams.companyId) && $routeParams.companyId == 'new') {
                vm.isLoading = false;
                vm.isNew = true;
                lazyLoadData();
            }

            base = $controller('BaseCompanyController', { $scope: $scope });
        })();

        /****** Base Call Events ******/

        $scope.$on('loadCompanyDataSuccess', function (event, data) {
            vm.companyId = data._id;
            vm.company = data;
            vm.isNew = false;
            vm.isLoading = false;
            lazyLoadData();

            $rootScope.$broadcast('checkIsFavorited', data._id);
        });

        $scope.$on('loadCompanyDataFailure', function (event, data) {
            alertService.add('danger', "Error getting record from service.");
            vm.isLoading = false;
        });

        $scope.$on('saveCompanyDataFailure', function (event, data) {
            errorService.handleError(data);
            vm.isSaving = false;
        });

        $scope.$on('saveCompanyDataFinally', function (event, data) {

        });

        $scope.$on('saveCompanyDataSuccess', function (event, data) {
            vm.companyId = data._id;
            vm.company = data;
            vm.isSaving = false;

            $rootScope.$broadcast('checkIsFavorited', data._id);

            alertService.add('success', "Save Successful.");
            if (vm.isNew) {
                $location.path('/companies/' + vm.companyId);
            }
        });

        $scope.$on('deleteCompanyDataSuccess', function (event, data) {
            $location.path('companies/');
            alertService.add('success', "Deleted record successfully.");
        });


        /****** Public Functions ******/

        vm.saveCompanyData = saveCompanyData;
        vm.deleteCompanyData = deleteCompanyData;
        vm.openAddProjectModal = openAddProjectModal;
        vm.openAddTeamModal = openAddTeamModal;
        vm.openInviteModal = openInviteModal;


        /****** Private Functions ******/

        function lazyLoadData() {
            projectService.getProjectTypes(function (data) {
                vm.projectTypes = data;
            }, undefined, undefined);

            if (vm.companyId  != '') {
                companyService.getProjects(vm.companyId, function (data) {
                    vm.projects = data;
                }, undefined, undefined);

                companyService.getTeams(vm.companyId, function (data) {
                    vm.teams = data;
                }, undefined, undefined);

                companyService.getMembers(vm.companyId, function (data) {
                    vm.members = data;
                }, undefined, undefined);

                companyService.getTopology(vm.companyId, function (data) {
                    vm.topology = data;
                }, undefined, undefined);
            }
        }

        function saveCompanyData() {
            vm.isSaving = true;
            base.saveCompanyData(vm.company);
        }

        function deleteCompanyData() {
            vm.isSaving = true;
            base.deleteCompanyData(vm.companyId);
        }


        /****** Modal Functions ******/

        function openAddProjectModal() {
            $modal.open({
                backdrop: 'static',
                templateUrl: 'templates/companies/addProjectModal.html',
                controller: 'AddProjectModalController as modalController',
                resolve: {
                    options: function () {
                        return {
                            companyId: vm.companyId,
                            companyName: vm.company.name
                        }
                    }
                }
            }).result.then(function (data) {
                    vm.projects.push(data);
                }, undefined);
        }

        function openAddTeamModal() {
            $modal.open({
                backdrop: 'static',
                templateUrl: 'templates/companies/addTeamModal.html',
                controller: 'AddTeamModalController as modalController',
                resolve: {
                    options: function () {
                        return {
                            companyId: vm.companyId,
                            companyName: vm.company.name
                        }
                    }
                }
            }).result.then(function (data) {
                    vm.teams.push(data);
                }, undefined);
        }

        function openInviteModal() {
            $modal.open({
                backdrop: 'static',
                templateUrl: 'templates/companies/inviteMemberModal.html',
                controller: 'CompanyInviteMemberModalController as modalController',
                resolve: {
                    options: function () {
                        return {
                            companyId: vm.companyId,
                            companyName: vm.company.name
                        }
                    }
                }
            }).result.then(function (data) {
                //vm.members.push(data);
            }, undefined);
        }

    }
})();

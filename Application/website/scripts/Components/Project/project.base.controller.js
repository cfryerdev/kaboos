(function () {
    angular.module('app.base').controller('BaseProjectController', baseProjectController);

    baseProjectController.$inject = ['$controller', '$routeParams', '$scope', '$modal', 'alertService', 'projectService', 'companyService'];

    function baseProjectController($controller, $routeParams, $scope, $modal, alertService, projectService, companyService) {
        var vm = this;
        var base = {};
        vm.company = 0;
        vm.company = {};

        /****** Constructor ******/

        (function () {
            base = $controller('BaseCompanyController', { $scope: $scope });
        })();

        /****** Base Call Events ******/

        $scope.$on('loadCompanyDataSuccess', function (event, data) {
            vm.companyId = data._id;
            vm.company = data;
            init();
        });

        $scope.$on('loadCompanyDataFailure', function (event, data) {
            alertService.add('danger', "Error getting record from service.");
        });

        /****** Private Functions ******/

        function init() {
            alertService.clear();
            if (angular.isDefined($routeParams.projectId) && $routeParams.projectId  != 'new') {
                loadProjectData($routeParams.projectId);
            } else {
                listProjectData();
            }
        }


        function loadCompanyData(companyId) {
            return base.loadCompanyData(companyId);
        }

        function listProjectData() {
            companyService.getProjects(vm.companyId,
                function (data) {
                    $scope.$emit('listProjectDataSuccess', data);
                },
                function (data) { $scope.$emit('listProjectDataFailure', data); },
                function (data) { $scope.$emit('listProjectDataFinally', data); });
        }

        function loadProjectData(projectId) {
            projectService.get(projectId, function (data) {
                $scope.$emit('loadProjectDataSuccess', data);
            },
            function (data) { $scope.$emit('loadProjectDataFailure', data); },
            function (data) { $scope.$emit('loadProjectDataFinally', data); });
        }

        function saveProjectData(model) {
            alertService.clear();

            projectService.save(model,
                function (data) {
                    $scope.$emit('saveProjectDataSuccess', data);
                },
                function (data) { $scope.$emit('saveProjectDataFailure', data); },
                function (data) { $scope.$emit('saveProjectDataFinally', data); });
        }

        function deleteProjectData(projectId) {
            $modal.open({
                backdrop: 'static',
                templateUrl: 'Templates/_common/confirmationModal.html',
                controller: 'ConfirmModalController as confirmModalCtrl',
                size: 'small',
                resolve: {
                    options: function () {
                        return {
                            title: 'Delete Project',
                            message: 'Are you sure that you want to delete this Project? This means also deleting any data stored within the Project.',
                            okText: 'Yes, Delete',
                            cancelText: 'Cancel'
                        }
                    }
                }
            }).result.then(function (confirm) {
                if (!confirm) { return; }
                projectService.remove(projectId,
                        function (data) {
                            $scope.$emit('deleteProjectDataSuccess', data);
                        },
                        function (data) { $scope.$emit('deleteProjectDataFailure', data); },
                        function (data) { $scope.$emit('deleteProjectDataFinally', data); });
            }, function () {
                // cancel callback
            });
        }



        /****** Exposed Functions ******/

        return {
            loadCompanyData: loadCompanyData,
            listProjectData: listProjectData,
            loadProjectData: loadProjectData,
            saveProjectData: saveProjectData,
            deleteProjectData: deleteProjectData
        };
    }

})();

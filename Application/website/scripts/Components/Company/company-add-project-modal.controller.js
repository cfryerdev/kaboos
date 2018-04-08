angular.module('company')
    .controller('AddProjectModalController', ['$modalInstance', '$window', '$location', 'options', 'companyService', 'projectService', 'alertService',
            function ($modalInstance, $window, $location, options, companyService, projectService, alertService) {
                var vm = this;
                vm.model = {};
                vm.companyId = 0;
                vm.companyName = '';
                vm.projectTypes = {};

                vm.init = function () {
                    vm.loadData();
                };

                vm.loadData = function () {
                    vm.companyId = options.companyId;
                    vm.companyName = options.companyName;
                    vm.model.projectTypeId = null;
                    projectService.getProjectTypes(function (data) {
                        vm.projectTypes = data;
                    }, undefined, undefined);
                };

                vm.add = function () {

                    vm.model._id = '';
                    vm.model.companyId = vm.companyId;

                    projectService.save(vm.model,
                        function (data) {
                            vm.model = data;
                            alertService.add('success', "Saved record successfully.");
                            vm.setResult();
                            vm.cancel();
                        },
                        function () {
                            alertService.add('danger', "Error saving record.");
                        },
                        function () {
                            vm.model = {};
                        });
                };

                vm.setResult = function () {
                    $modalInstance.close(vm.model);
                }

                vm.cancel = function () {
                    $modalInstance.close();
                };
            }
    ]);

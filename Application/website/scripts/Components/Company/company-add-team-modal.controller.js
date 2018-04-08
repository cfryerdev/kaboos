angular.module('company')
    .controller('AddTeamModalController', ['$modalInstance', '$window', '$location', 'options', 'companyService', 'teamService', 'alertService',
            function ($modalInstance, $window, $location, options, companyService, teamService, alertService) {
                var vm = this;
                vm.model = {};
                vm.companyId = 0;
                vm.companyName = '';

                vm.init = function () {
                    vm.loadData();
                };

                vm.loadData = function () {
                    vm.companyId = options.companyId;
                    vm.companyName = options.companyName;
                };

                vm.add = function () {

                    vm.model._id = '';
                    vm.model.companyId = vm.companyId;

                    teamService.save(vm.model,
                        function (data) {
                            vm.model = data;
                            alertService.popToast('success', "Save Successful", "Saved record successfully.");
                            vm.setResult();
                            vm.cancel();
                        },
                        function () {
                            alertService.popToast('error', "Error Saving", "Error saving record.");
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

angular.module('company')
    .controller('CompanyInviteMemberModalController', ['$modalInstance', '$window', '$location', 'options', 'companyService', 'alertService',
            function ($modalInstance, $window, $location, options, companyService, alertService) {
                var vm = this;
                vm.model = {};
                vm.memberTypes = [];

                vm.init = function () {
                    vm.loadData();
                }

                vm.loadData = function () {
                    vm.model.companyId = options.companyId;
                    vm.model.companyName = options.companyName;

                    companyService.getMemberTypes(function (data) {
                      vm.memberTypes = data;
                    }, undefined, undefined);
                }

                vm.invite = function () {
                    companyService.createInvite(vm.model,
                      function () {
                        alertService.add('success', 'An invite was created, if this is a valid email they will receive an in app invite notification.');
                      },
                      undefined,
                      function () {
                        $modalInstance.close();
                      });
                }

                vm.cancel = function () {
                    $modalInstance.close();
                }
            }
    ]);

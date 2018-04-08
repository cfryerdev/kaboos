angular.module('account')
    .controller('AccountInviteModalController', ['$modalInstance', '$window', '$location', 'options', 'accountService', 'alertService',
            function ($modalInstance, $window, $location, options, accountService, alertService) {
                var vm = this;
                vm.model = {};

                vm.init = function () {
                    vm.loadData();
                };

                vm.loadData = function () {
                    vm.model = options.invite;
                };

                vm.accept = function () {
                    accountService.acceptInvite(vm.model._id,
                      function () {
                        alertService.add('success', "Invite Accepted Successfully.");
                        $modalInstance.close();
                      });
                }

                vm.decline = function () {
                  accountService.declineInvite(vm.model._id,
                    function () {
                      alertService.add('success', "Invite Declined Successfully.");
                      $modalInstance.close();
                    });
                }

                vm.cancel = function () {
                    $modalInstance.close();
                };
            }
    ]);

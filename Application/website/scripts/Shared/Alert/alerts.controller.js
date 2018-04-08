angular.module('alerts')
    .controller('AlertCtrl', ['alertService',
        function (alertService) {
            var vm = this;

            vm.alerts = alertService.get();

            vm.closeAlert = function (index) {
                alertService.closeAlertIdx(index);
            };

            vm.clearAlerts = function () {
                alertService.clear();
            };
        }
    ]);

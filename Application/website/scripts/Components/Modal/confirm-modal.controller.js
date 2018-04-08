angular.module('app.common')
.controller('ConfirmModalController', ['$modalInstance', '$window', '$location', 'options',
    function ($modalInstance, $window, $location, options, companyService, alertService) {
        var vm = this;

        angular.extend(vm, {
          ok: ok,
          cancel: cancel
        });

        loadData();

        function loadData() {
          angular.extend(vm, options);
        };

        function ok() {
            $modalInstance.close(true);
        };

        function cancel() {
            $modalInstance.close(false);
        };
    }
]);

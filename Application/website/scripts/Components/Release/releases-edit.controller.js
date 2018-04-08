(function () {
    angular.module('release')
    .controller('ReleaseEditController', ReleaseEditController);

    ReleaseEditController.$inject = ['$routeParams', 'companyService', 'releaseService'];

    function ReleaseEditController($routeParams, companyService, releaseService) {
        var vm = this;
        vm.release = {};
        vm.stages = [];
        vm.statuses = [];

        /****** Exposed Functions ******/


        /****** Constructor ******/

        (function () {
          if (angular.isDefined($routeParams.releaseId)) {
            loadRelease();
          }
        })();

        /****** Private Functions ******/

        function loadRelease() {
          releaseService.get($routeParams.releaseId, function (data) {
            vm.release = data;
          }, undefined, function() {
            vm.isLoading = false;
          });

          releaseService.listStages(function (data) {
            vm.stages = data;
          });

          releaseService.listStatuses(function (data) {
            vm.statuses = data;
          });
        }

        function lazyLoadData() {

        }

    }
})();

(function () {
    angular.module('project').controller('ProjectListController', projectListController);

    projectListController.$inject = ['$controller', '$scope', 'alertService'];

    function projectListController($controller, $scope, alertService) {
        var vm = this;
        var base = {};

        vm.isLoading = false;
        vm.projects = {};
        vm.companyId = 0;
        vm.company = {};


        /****** Constructor ******/

        function init() {
            vm.isLoading = true;
            base = $controller('BaseProjectController', { $scope: $scope });
        }
        vm.init = init;
        init();

        /****** Base Call Events ******/

        $scope.$on('loadCompanyDataSuccess', function (event, data) {
            vm.companyId = data._id;
            vm.company = data;
        });

        $scope.$on('listProjectDataSuccess', function (event, data) {
            vm.projects = data;
            vm.isLoading = false;
        });

        $scope.$on('listProjectDataFailure', function (event, data) {
            alertService.add('danger', "Error getting records from service.");
            vm.isLoading = false;
        });


    }

})();

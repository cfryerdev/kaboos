(function() {
    angular.module('company').controller('CompanyListController', companyListController);

    companyListController.$inject = ['$controller', '$scope', 'alertService'];

    function companyListController($controller, $scope, alertService) {
        var vm = this;
        var base = {};

        vm.isLoading = false;
        vm.companies = {};

        /****** Constructor ******/

        (function () {
            vm.isLoading = true;
            base = $controller('BaseCompanyController', { $scope: $scope });
        })();

        /****** Base Call Events ******/

        $scope.$on('listCompanyDataSuccess', function (event, data) {
            vm.companies = data;
            vm.isLoading = false;
        });

        $scope.$on('listCompanyDataFailure', function (event, data) {
            alertService.add('danger', "Error getting records from service.");
            vm.isLoading = false;
        });


    }

})();

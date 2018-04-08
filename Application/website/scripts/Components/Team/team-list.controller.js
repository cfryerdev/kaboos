(function () {
    angular.module('team').controller('TeamListController', teamListController);

    teamListController.$inject = ['$controller', '$scope', 'alertService', 'teamService', 'companyService'];

    function teamListController($controller, $scope, alertService, teamService, companyService) {
        var vm = this;
        var base = {};

        vm.isLoading = false;
        vm.companyId = 0;
        vm.company = {};
        vm.teams = {};


        /****** Constructor ******/

        (function () {
            vm.isLoading = true;
            base = $controller('BaseCompanyController', { $scope: $scope });
        })();


        /****** Base Call Events ******/

        $scope.$on('loadCompanyDataSuccess', function (event, data) {
            vm.companyId = data._id;
            vm.company = data;
            init();
        });

        function init() {
            companyService.getTeams(vm.companyId,
                function (data) {
                    vm.teams = data;
                    $scope.$emit('listTeamDataSuccess', data);
                },
                function (data) {
                    $scope.$emit('listTeamDataFailure', data);
                },
                function (data) {
                    vm.isLoading = false;
                    $scope.$emit('listTeamDataFinally', data);
                });
        }


    }

})();

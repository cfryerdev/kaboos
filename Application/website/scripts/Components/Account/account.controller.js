(function () {
    angular.module('account').controller('AccountController', accountController);

    accountController.$inject = ['$location', '$rootScope', 'alertService', 'accountService'];

    function accountController($location, $rootScope, alertService, accountService) {
        var vm = this;

        vm.loginModel = {};
        vm.profileModel = {};
        vm.resetModel = {};
        vm.forgotModel = {};

        /****** Exposed Functions ******/

        vm.login = login;
        vm.register = register;
        vm.login = login;
        vm.logout = logout;

        /****** Constructor ******/

        (function () {
          alertService.clear();
          vm.loginModel.createJoinCompany = 'create';
        })();

        /****** Private Functions ******/

        function login() {
            alertService.clear();
            accountService.login(vm.loginModel, loginSuccessCallback, undefined, loginFinallyCallback);
        }

        function logout() {
            alertService.clear();
            accountService.logout(logoffSuccessCallback);
        }

        function register() {

            alertService.clear();

            if (vm.loginModel.createJoinCompany != 'company') {
                vm.loginModel.companyName = '';
            }

            if (vm.loginModel.createJoinCompany != 'join') {
                vm.loginModel.companyInviteCode = '';
            }

            accountService.register(vm.loginModel, registerSuccessCallback, undefined, registerFinallyCallback);
        }

        function logoffSuccessCallback(data) {
            $location.path('/accounts/login');
        }

        function loginSuccessCallback(data) {
            $location.path('companies');
        }

        function registerSuccessCallback(data) {
            $location.path('companies');
        }

        function loginFinallyCallback(data) {
            vm.loginModel.password = '';
        }

        function registerFinallyCallback(data) {
            vm.loginModel.password = '';
            vm.loginModel.confirmPassword = '';
        }
    }

})();

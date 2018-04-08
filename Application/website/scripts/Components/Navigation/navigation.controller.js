(function () {
    angular.module('navigation').controller('NavigationController', navigationController);

    navigationController.$inject = ['$rootScope', '$window', '$location', 'accountService', 'cfpLoadingBar', 'alertService'];

    function navigationController($rootScope, $window, $location, accountService, cfpLoadingBar, alertService) {
        var vm = this;

        vm.account = {};
        vm.isLoggedIn = false;
        vm.inviteCount = 0;
        vm.notificationCount = 0;
        vm.isSearching = false;
        vm.sidebarToggle = false;
        vm.wizardToggle = false;

        /****** Public Functions ******/

        vm.checkLoggedIn = checkLoggedIn;
        vm.apiForThisPage = apiForThisPage;

        /****** Constructor ******/

        (function () {
            checkLoggedIn();
        })();

        /****** Public Events  ******/
        $rootScope.$on('$routeChangeStart', function(next, current) {
          cfpLoadingBar.start();
          alertService.clear();
        });

        $rootScope.$on('$routeChangeSuccess', function(next, current) {
          cfpLoadingBar.complete();
        });

        $rootScope.$on('$routeChangeError', function(next, current) {
          cfpLoadingBar.complete();
        });
        //
        // $rootScope.$on('$locationChangeStart', function(next, current) {
        //   console.log('locationChangeStart');
        // });
        //
        // $rootScope.$on('$locationChangeSuccess', function(next, current) {
        //   console.log('locationChangeSuccess');
        // });

        /****** Public Functions ******/

        vm.openSearch = function(){
            vm.isSearching = true;
        }

        vm.closeSearch = function(){
            vm.isSearching = false;
        }

        vm.checkActiveRoute = function (path) {
          return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        }

        vm.sidebarStat = function(event) {
            vm.sidebarToggle = false;
        }

        /****** Private Functions ******/

        function checkLoggedIn() {
            accountService.isLoggedIn(function (data) {
                if(data.isLoggedIn) {
                  if($location.path() == '/accounts/register' || $location.path() == '/accounts/login'){
                    accountService.logout();
                  }
                  else {
                    vm.isLoggedIn = true;
                    vm.inviteCount = data.inviteCount;
                    vm.notificationCount = data.notificationCount;
                    accountService.getProfile(function (data) {
                      vm.account = data;
                    });
                  }
                }
            });
        }

        function apiForThisPage() {
            var url = window.location.href.replace('#', 'api');
            $window.open(url);
        }

        $rootScope.$on('accountService:login', function(evnt, args) {
          accountService.getProfile(function (data) {
            vm.account = data;
            vm.isLoggedIn = true;
            checkLoggedIn();
          });
        });

        $rootScope.$on('accountService:logout', function(evnt, args) {
          vm.account = {};
          vm.isLoggedIn = false;
        });

        $rootScope.$on('accountService:checkInviteCount', function(evnt, args) {
          getInviteCount();
        });

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
          getInviteCount();
        });

        function getInviteCount() {
          vm.inviteCount = 0;
          accountService.isLoggedIn(function (data) {
              if(data.isLoggedIn) {
                vm.inviteCount = data.inviteCount;
                vm.notificationCount = data.notificationCount;
              }
          });
        }

    }

})();

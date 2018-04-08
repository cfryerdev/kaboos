(function () {
    angular.module('account').controller('AccountProfileController', accountProfileController);

    accountProfileController.$inject = ['$scope', '$q', '$location', '$routeParams', '$modal', 'alertService', 'accountService', 'errorService'];

    function accountProfileController($scope, $q, $location, $routeParams, $modal, alertService, accountService, errorService) {
        var vm = this;

        vm.isSaving = false;
        vm.isLoading = false;

        vm.profile = {};
        vm.prefs = {};
        vm.resetPassword = {};
        vm.pendingInvites = [];
        vm.pastInvites = [];
        vm.companies = [];

        /****** Constructor ******/

        (function () {
            vm.isLoading = true;
            init();
        })();


        /****** Exposed Functions ******/

        vm.getProfile = getProfile;
        vm.saveProfile = saveProfile;
        vm.viewInvite = viewInvite;


        /****** Private Functions ******/

        function init() {
            alertService.clear();

            accountService.isLoggedIn(function (data) {
                if (data.isLoggedIn) {
                    getProfile();
                } else {
                  $location.path('/accounts/login');
                }
            });
        }

        function getProfile() {
            accountService.getProfile(getProfileSuccessCallback);
        }

        function saveProfile() {
            alertService.clear();

            $q.all([
                saveProfilePromise()
                ,savePasswordPromise()
                ,savePrefsPromise()
            ])
            .then(function(data) {
                vm.isLoading = false;
            });

        }

        function saveProfilePromise() {
          var deferred = $q.defer();

          accountService.saveProfile(vm.profile,
            function (data) {
              vm.profile = data;
              alertService.add('success', "Save Profile Successful.");
              deferred.resolve();
            },
            function (err) {
              errorService.handleError(err);
              deferred.reject();
            });

          return deferred.promise;
        }

        function savePrefsPromise() {
          var deferred = $q.defer();

          accountService.savePrefs(vm.prefs, function (data) {
              vm.prefs = data;
              alertService.add('success', "Save Prefs Successful.");
              deferred.resolve();
          }, function (err) {
            errorService.handleError(err);
            deferred.reject();
          });

          return deferred.promise;
        }

        function savePasswordPromise() {
          var deferred = $q.defer();

          if ((vm.resetPassword.currentPassword != undefined && vm.resetPassword.currentPassword != null)
            && (vm.resetPassword.newPassword != undefined && vm.resetPassword.newPassword != null)
            && (vm.resetPassword.confirmPassword != undefined && vm.resetPassword.confirmPassword != null)) {
              accountService.savePassword(vm.resetPassword, function (data) {
                  vm.resetPassword = {};
                  alertService.add('success', "Save Password Successful.");
                  deferred.resolve();
              },
              function () {
                  alertService.add('danger', "Save Password Failed.");
                  deferred.reject();
              });
          }
          else {
            deferred.resolve();
          }

          return deferred.promise;
        }

        function getProfileSuccessCallback(data) {
            vm.profile = data;
            vm.isLoading = false;

            accountService.getPrefs(function (data) {
                vm.prefs = data;
            });

            accountService.getCompanies(function (data) {
                vm.companies = data;
            });

            refreshInvites();
        }

        // function saveProfileSuccessCallback(data) {
        //     vm.profile = data;
        //
        //     accountService.savePrefs(vm.prefs, function (data) {
        //         vm.prefs = data;
        //     },
        //     undefined,
        //     function() {
        //       vm.isLoading = false;
        //       alertService.add('success', "Save Successful.");
        //     });
        //
        //
        // }


        function refreshInvites() {
          accountService.getInvites(function (data) {
              parseInvites(data);
          });
        }

        function viewInvite(invite) {
          $modal.open({
              backdrop: 'static',
              templateUrl: 'templates/accounts/accountInviteModal.html',
              controller: 'AccountInviteModalController as modalController',
              resolve: {
                  options: function () {
                      return {
                          invite: invite
                      }
                  }
              }
          }).result.then(function (data) {
              refreshInvites();
          }, undefined);
        }

        function parseInvites(inviteCollection) {
          vm.pendingInvites = [];
          vm.pastInvites = [];
          angular.forEach(inviteCollection, function (invite) {
            if (invite.status.name == 'Pending') {
              vm.pendingInvites.push(invite);
            } else {
              vm.pastInvites.push(invite);
            }
          })
        }

    }

})();

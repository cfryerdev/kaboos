//  $window.history.back();
(function () {

  'use strict';

  angular
    .module('app.common')
    .controller('AccountInviteController', AccountInviteController);

  AccountInviteController.$inject = ['$window', '$modal', 'alertService', 'accountService'];

  function AccountInviteController($window, $modal, alertService, accountService) {
      var vm = this;

      vm.pendingInvites = [];

      vm.viewInvite = viewInvite;
      vm.refreshInvites = refreshInvites;

      (function () {
        alertService.clear();
        refreshInvites();
      })();

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
        angular.forEach(inviteCollection, function (invite) {
          if (invite.status.name == 'Pending') {
            vm.pendingInvites.push(invite);
          }
        })
      }
  }
})();

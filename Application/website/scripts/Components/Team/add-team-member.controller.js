(function () {
    angular.module('team').controller('addTeamMemberController', addTeamMemberController);

    addTeamMemberController.$inject = ['$controller', '$scope', 'options', '$modalInstance', 'alertService', 'companyService', 'teamService'];

    function addTeamMemberController($controller, $scope, options, $modalInstance, alertService, companyService, teamService) {
        var vm = this;
        vm.members = [];

        /****** Constructor ******/

        (function () {
          angular.extend(vm, options);

          companyService.getMembers(vm.companyId, function (data) {
              vm.members = data;
          }, undefined, undefined);
        })();

        vm.add = function () {
          teamService.addTeamMember(vm.teamId, { team: vm.teamId, companyMember: vm.selectedMemberId },
              function (data) {
                  $modalInstance.close(data);
              },
              function () {
                  alertService.popToast('error', "Oops.", "Unable to save, please try again.");
              }, undefined);
        }

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})();
